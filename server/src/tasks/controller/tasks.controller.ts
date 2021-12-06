import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { TasksDTO } from '../dto/tasks.dto';
import { ITasksController } from './tasks.interface';
import { ITASKS_SERVICE } from '../service/tasks.interface';
import { ITasksService } from '../service/tasks.interface';
import { dtoToEntity } from '../mapper/dto.to.entity';
import { Task } from '../entity/tasks.entity';

@Controller('tasks')
export class TasksController implements ITasksController {
  constructor(
    @Inject(ITASKS_SERVICE) private readonly tasksService: ITasksService,
  ) {}

  @Get('/all')
  getAllTasks(): Promise<TasksDTO[]> {
    return this.tasksService.getAllTasks();
  }

  @Get('/:id')
  getTask(@Param('id') id: string): TasksDTO {
    return this.tasksService.getTask(Number(id));
  }

  @Post('/new')
  createTask(@Body() body: TasksDTO): Promise<Task> {
    const task = dtoToEntity(body);
    return this.tasksService.createTask(task);
  }
}
