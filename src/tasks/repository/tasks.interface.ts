import { CreateTask } from '../entity/domain/create-task.entity';
import { UpdateTask } from '../entity/domain/update-task.entity';
import { Task } from '../entity/tasks.entity';

export const ITASKS_REPOSTORY = 'ITASKS_REPOSTORY';

export interface ITasksRepository {
  getAllTasks(): Promise<Task[]>;
  getTask(id: number): Promise<Task>;
  createTask(task: CreateTask): Promise<Task>;
  getByTitle(title: string): Promise<Task[]>;
  getByPriority(priority: string): Promise<Task[]>;
  deleteTask(id: number): Promise<{ success: boolean }>;
  updateTask(task: UpdateTask): Promise<Task>;
}
