import { TasksDTO } from '../dto/tasks.dto';
import { Task } from '../entity/tasks.entity';

export interface ITasksController {
  getAllTasks(): Promise<TasksDTO[]>;
  getTask(id: string): TasksDTO;
  createTask(body: TasksDTO): Promise<Task>;
  //   deleteTask(): boolean;
  //   updateTask(): boolean;
}
