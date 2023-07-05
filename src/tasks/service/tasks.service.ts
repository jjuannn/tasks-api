import { Inject, Injectable } from '@nestjs/common';
import { ITasksService } from './tasks.interface';
import { ITASKS_REPOSTORY } from '../repository/tasks.interface';
import { ITasksRepository } from '../repository/tasks.interface';
import { Task } from '../entity/tasks.entity';
import { UpdateTask } from '../entity/domain/update-task.entity';
import { CreateTask } from '../entity/domain/create-task.entity';
import { PriorityTypes } from '../enum/priority.enum';

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

  async getByPriority(priority: PriorityTypes): Promise<Task[]> {
    return this.tasksRepository.getByPriority(priority.toLowerCase());
  }

  async createTask(task: CreateTask): Promise<Task> {
    return this.tasksRepository.createTask(task);
  }

  async updateTask(task: UpdateTask): Promise<Task> {
    return this.tasksRepository.updateTask(task);
  }

  async deleteTask(id: number): Promise<{ success: boolean }> {
    return this.tasksRepository.deleteTask(id);
  }
}
