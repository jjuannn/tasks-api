import { CreateTaskDTO } from '../dto/create-task-dto';
import { UpdateTaskDTO } from '../dto/update-task.dto';
import { Task } from '../entity/tasks.entity';
import { PriorityTypes } from '../enum/priority.enum';

export interface ITasksController {
  getAllTasks(): Promise<Task[]>;
  getTask(id: string): Promise<Task>;
  createTask(body: CreateTaskDTO): Promise<Task>;
  getByTitle(title: string): Promise<Task[]>;
  getByPriority(priority: PriorityTypes): Promise<Task[]>;
  deleteTask(id: string): Promise<{ success: boolean }>;
  updateTask(body: UpdateTaskDTO, id: string): Promise<Task>;
}
