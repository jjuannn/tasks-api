import { TasksDTO } from '../dto/tasks.dto';
import { Task } from '../entity/tasks.entity';

export interface ITasksController {
  getAllTasks(): Promise<Task[]>;
  getTask(id: string): Promise<Task>;
  createTask(body: TasksDTO): Promise<Task>;
  getByTitle(title: string): Promise<Task[]>;
  getByPriority(priority: string): Promise<Task[]>;
  deleteTask(id: string): Promise<Object>;
  updateTask(body: TasksDTO, id: string): Promise<Task>;
}
