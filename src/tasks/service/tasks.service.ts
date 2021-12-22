import { Inject, Injectable } from '@nestjs/common';
import { ITasksService } from './tasks.interface';
import { ITASKS_REPOSTORY } from '../repository/tasks.interface';
import { ITasksRepository } from '../repository/tasks.interface';
import { Task } from '../entity/tasks.entity';

@Injectable()
export class TasksService implements ITasksService {
  constructor(
    @Inject(ITASKS_REPOSTORY) private tasksRepository: ITasksRepository,
  ) {}

  async getAllTasks(): Promise<Task[]> {
    const tasks = await this.tasksRepository.getAllTasks();

    return tasks;
  }

  async getTask(id: number): Promise<Task> {
    const task = this.tasksRepository.getTask(id);
    return task;
  }

  async getByTitle(title: string): Promise<Task[]> {
    return this.tasksRepository.getByTitle(title.toLowerCase());
  }

  async getByPriority(priority: string): Promise<Task[]> {
    return this.tasksRepository.getByPriority(priority.toLowerCase());
  }

  async createTask(task: Task): Promise<Task> {
    return this.tasksRepository.createTask(task);
  }

  async updateTask(task: Task, id: number): Promise<Task> {
    const updateTask = task;
    updateTask.id = id;
    return this.tasksRepository.updateTask(task);
  }

  async deleteTask(id: number): Promise<Object> {
    return this.tasksRepository.deleteTask(id);
  }
}
