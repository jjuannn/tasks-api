import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { PriorityTypes } from '../enum/priority.enum';

export class CreateTaskDTO {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  @IsEnum(PriorityTypes)
  priority: PriorityTypes;
}
