import { TasksDTO } from '../dto/tasks.dto';
import { Task } from '../entity/tasks.entity';

export function dtoToEntity(taskDTO: TasksDTO): Task {
  const task = new Task();

  task.id = taskDTO.id;
  task.description = taskDTO.description;
  task.title = taskDTO.title;
  task.hasHighPriority = taskDTO.hasHighPriority;

  return task;
}
