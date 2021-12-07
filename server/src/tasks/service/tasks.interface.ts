import { Task } from '../entity/tasks.entity';

export const ITASKS_SERVICE = 'TASKS SERVICE';

export interface ITasksService {
  getAllTasks(): Promise<Task[]>;
  getTask(id: number): Promise<Task>;
  createTask(task: Task): Promise<Task>;
  deleteTask(id: number): Promise<Task[]>;
  updateTask(task: Task, id: number): Promise<Task>;
}
