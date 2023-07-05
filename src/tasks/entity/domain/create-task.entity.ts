import { PriorityTypes } from 'src/tasks/enum/priority.enum';

export class CreateTask {
  constructor(
    public title: string,
    public description: string,
    public priority: PriorityTypes,
  ) {}
}
