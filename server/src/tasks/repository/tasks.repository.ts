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

  async createTask(task: Task): Promise<Task> {
    const savedTask = await this.tasksRepository.save(task);
    return savedTask;
  }

  async updateTask(task: Task): Promise<Task> {
    await this.tasksRepository.update(task.id, task);
    return await this.getTask(task.id);
  }

  async deleteTask(id: number): Promise<Task[]> {
    await this.tasksRepository.delete({ id });
    return await this.getAllTasks();
  }
}
