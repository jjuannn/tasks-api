import { CreateTask } from '../entity/domain/create-task.entity';
import { UpdateTask } from '../entity/domain/update-task.entity';
import { Task } from '../entity/tasks.entity';
import { PriorityTypes } from '../enum/priority.enum';

export const ITASKS_SERVICE = 'TASKS SERVICE';

export interface ITasksService {
  getAllTasks(): Promise<Task[]>;
  getTask(id: number): Promise<Task>;
  getByTitle(title: string): Promise<Task[]>;
  deleteTask(id: number): Promise<{ success: boolean }>;
  createTask(task: CreateTask): Promise<Task>;
  updateTask(task: UpdateTask): Promise<Task>;
  getByPriority(priority: PriorityTypes): Promise<Task[]>;
}
