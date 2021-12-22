import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TasksDTO } from '../dto/tasks.dto';
import { Task } from '../entity/tasks.entity';
import { ITasksRepository } from './tasks.interface';

@Injectable()
export class TasksRepository implements ITasksRepository {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}

  async getAllTasks(): Promise<Task[]> {
    const tasks = await this.tasksRepository.query('SELECT * FROM tasks');

    if (!tasks) {
      throw new NotFoundException('Cannot find tasks');
    }

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

    if (!task.length) {
      throw new NotFoundException(`Cannot find tasks with the title ${title}`);
    }

    return task;
  }

  async getByPriority(priority: string): Promise<Task[]> {
    const task = await this.tasksRepository.query(
      `SELECT * FROM tasks WHERE LOWER(hasHighPriority) LIKE '%${priority}%'`,
    );

    if (!task.length) {
      throw new NotFoundException(`Cannot find tasks with the title ${priority}`);
    }

    return task;
  }

  async createTask(task: Task): Promise<Task> {
    const savedTask = await this.tasksRepository.save(task);
    return savedTask;
  }

  async updateTask(task: Task): Promise<Task> {
    const updated = await this.tasksRepository.update(task.id, task);

    if (updated.affected > 0) {
      return this.getTask(task.id);
    }

    throw new NotFoundException(`Cannot update task with id ${task.id} as it does not exist`);
  }

  async deleteTask(id: number): Promise<Object> {
    const deleted = await this.tasksRepository.delete({ id });

    if (deleted.affected > 0) {
      return { success: true };
    }

    throw new NotFoundException(`Cannot delete task with id ${id} as it does not exist`);
  }
}
