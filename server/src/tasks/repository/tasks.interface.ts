import { TasksDTO } from '../dto/tasks.dto';
import { Task } from '../entity/tasks.entity';

export const ITASKS_REPOSTORY = 'ITASKS_REPOSTORY';

export interface ITasksRepository {
  getAllTasks(): Promise<Task[]>;
  getTask(id: number): Promise<Task>;
  createTask(task: Task): Promise<Task>;
  deleteTask(id: number): Promise<Task[]>;
  updateTask(task: Task): Promise<Task>;
}
