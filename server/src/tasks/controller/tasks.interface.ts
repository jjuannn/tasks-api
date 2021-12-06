import { TasksDTO } from '../dto/tasks.dto';

export interface ITasksController {
  getAllTasks(): Promise<TasksDTO[]>;
  getTask(id: string): TasksDTO;
  createTask(body: TasksDTO): TasksDTO[];
  //   deleteTask(): boolean;
  //   updateTask(): boolean;
}
