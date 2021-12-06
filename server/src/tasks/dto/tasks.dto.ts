import { IsNotEmpty } from 'class-validator';

export class TasksDTO {
  id: number;

  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  hasHighPriority: boolean;
}
