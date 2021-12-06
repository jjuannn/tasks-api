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
}
// SOLUCIONAR EL PROBLEMA DE LOS TABLE NAMES
/*
 *
 * @amhed if you still have problem, try clear the dist folder,
 * sometime the file there get stuck and not updated even though you have updated ts file.
 * I wasted 1 hour to realize that
 */
