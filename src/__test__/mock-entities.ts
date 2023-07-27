import { CreateTask } from '../tasks/entity/domain/create-task.entity';
import { UpdateTask } from '../tasks/entity/domain/update-task.entity';
import { Task } from '../tasks/entity/tasks.entity';
import { PriorityTypes } from '../tasks/enum/priority.enum';

export const createTaskMock = new CreateTask(
  'Task Title',
  'Task Description',
  PriorityTypes.MEDIUM,
);

export const updateTaskMock = new UpdateTask(
  1,
  'Updated Title',
  'Updated Description',
  PriorityTypes.MEDIUM,
);

export const databaseTask: Task = {
  id: 1,
  title: 'Task Title',
  description: 'Task Description',
  priority: PriorityTypes.MEDIUM,
};
