import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { PriorityTypes } from '../enum/priority.enum';

export class UpdateTaskDTO {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsEnum(PriorityTypes)
  priority?: PriorityTypes;
}
