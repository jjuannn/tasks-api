import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from '../entity/tasks.entity';
import { ITasksRepository } from './tasks.interface';
import { UpdateTask } from '../entity/domain/update-task.entity';
import { CreateTask } from '../entity/domain/create-task.entity';
import { PriorityTypes } from '../enum/priority.enum';

@Injectable()
export class TasksRepository implements ITasksRepository {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}

  async getAllTasks(): Promise<Task[]> {
    const tasks = await this.tasksRepository.find({
      select: ['id', 'description', 'title', 'priority'],
    });
    return tasks;
  }

  async getTask(id: number): Promise<Task> {
    const task = await this.tasksRepository.findOne({ where: { id } });

    if (!task) {
      throw new NotFoundException(`Cannot find task with id ${id}`);
    }

    return task;
  }

  async getByTitle(title: string): Promise<Task[]> {
    const task = await this.tasksRepository.query(
      `SELECT * FROM tasks WHERE LOWER(title) LIKE '%${title}%'`,
    );

    return task;
  }

  async getByPriority(priority: PriorityTypes): Promise<Task[]> {
    const task = await this.tasksRepository.find({
      where: { priority },
    });

    return task;
  }

  async createTask(task: CreateTask): Promise<Task> {
    const savedTask = await this.tasksRepository.save(task);
    return savedTask;
  }

  async updateTask(task: UpdateTask): Promise<Task> {
    const databaseTask = await this.getTask(task.id);

    if (!databaseTask) {
      throw new NotFoundException(
        `Cannot update task with id ${task.id} as it does not exist`,
      );
    }

    const updated = await this.tasksRepository
      .createQueryBuilder()
      .update()
      .set({
        title: task.title ?? databaseTask.title,
        description: task.description ?? databaseTask.description,
        priority: task.priority ?? databaseTask.priority,
      })
      .where('id=:id')
      .setParameter('id', task.id)
      .execute();

    if (updated.affected > 0) {
      return this.getTask(task.id);
    }
  }

  async deleteTask(id: number): Promise<{ success: boolean }> {
    const deleted = await this.tasksRepository.delete({ id });

    if (deleted.affected > 0) {
      return { success: true };
    }

    throw new NotFoundException(
      `Cannot delete task with id ${id} as it does not exist`,
    );
  }
}
