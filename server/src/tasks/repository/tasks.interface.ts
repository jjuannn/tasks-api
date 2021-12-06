import { TasksDTO } from '../dto/tasks.dto';
import { Task } from '../entity/tasks.entity';

export const ITASKS_REPOSTORY = 'ITASKS_REPOSTORY';

export interface ITasksRepository {
  getAllTasks(): Promise<TasksDTO[]>;
  // getTask(id: number): Promise<TasksDTO>;
  createTask(task: Task): Promise<Task>;
  //   deleteTask(): boolean;
  //   updateTask(): boolean;
}
