import { Injectable } from '@nestjs/common';
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

  async getAllTasks(): Promise<TasksDTO[]> {
    const tasks = await this.tasksRepository.query('SELECT * FROM tasks');
    return tasks;
  }

  async createTask(task: Task): Promise<Task> {
    const savedTask = await this.tasksRepository.save(task);
    return savedTask;
  }
}
