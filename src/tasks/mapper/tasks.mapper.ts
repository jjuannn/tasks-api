import { UpdateTaskDTO } from '../dto/update-task.dto';
import { CreateTask } from '../entity/domain/create-task.entity';
import { UpdateTask } from '../entity/domain/update-task.entity';

export class TasksMapper {
  static fromUpdateDTOToUpdateEntity({
    id,
    title,
    description,
    priority,
  }: UpdateTaskDTO): UpdateTask {
    return new UpdateTask(Number(id), title, description, priority);
  }

  static fromCreateDTOToCreateEntity({
    title,
    description,
    priority,
  }: CreateTask): CreateTask {
    return new CreateTask(title, description, priority);
  }
}
