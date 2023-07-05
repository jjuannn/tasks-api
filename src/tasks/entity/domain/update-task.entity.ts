import { PriorityTypes } from 'src/tasks/enum/priority.enum';

export class UpdateTask {
  constructor(
    public id: number,
    public title?: string,
    public description?: string,
    public priority?: PriorityTypes,
  ) {}
}
