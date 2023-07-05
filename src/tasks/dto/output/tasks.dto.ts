import { IsEnum, IsNotEmpty } from 'class-validator';
import { PriorityTypes } from '../../enum/priority.enum';

export class TasksDTO {
  id?: number;

  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  @IsEnum(PriorityTypes)
  priority: PriorityTypes;
}
