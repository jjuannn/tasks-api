import { TasksDTO } from '../dto/tasks.dto';
import { Task } from '../entity/tasks.entity';

export interface ITasksController {
  getAllTasks(): Promise<Task[]>;
  getTask(id: string): Promise<Task>;
  createTask(body: TasksDTO): Promise<Task>;
  deleteTask(id: string): Promise<Task[]>;
  updateTask(body: TasksDTO, id: string): Promise<Task>;
}
