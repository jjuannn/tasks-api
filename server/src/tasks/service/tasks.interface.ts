import { TasksDTO } from '../dto/tasks.dto';
import { Task } from '../entity/tasks.entity';

export const ITASKS_SERVICE = 'TASKS SERVICE';

export interface ITasksService {
  getAllTasks(): Promise<TasksDTO[]>;
  getTask(id: number): TasksDTO;
  createTask(task: TasksDTO): Promise<Task>;
  //   deleteTask(): boolean;
  //   updateTask(): boolean;
}
