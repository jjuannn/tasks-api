import { TasksDTO } from '../dto/tasks.dto';

export const ITASKS_SERVICE = 'TASKS SERVICE';

export interface ITasksService {
  getAllTasks(): Promise<TasksDTO[]>;
  getTask(id: number): TasksDTO;
  createTask(task: TasksDTO): TasksDTO[];
  //   deleteTask(): boolean;
  //   updateTask(): boolean;
}
