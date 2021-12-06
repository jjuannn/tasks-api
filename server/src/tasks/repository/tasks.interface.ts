import { TasksDTO } from '../dto/tasks.dto';

export const ITASKS_REPOSTORY = 'ITASKS_REPOSTORY';

export interface ITasksRepository {
  getAllTasks(): Promise<TasksDTO[]>;
  // getTask(id: number): Promise<TasksDTO>;
  // createTask(task: TasksDTO): Promise<TasksDTO[]>;
  //   deleteTask(): boolean;
  //   updateTask(): boolean;
}
