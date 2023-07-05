import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
} from '@nestjs/common';
import { ITasksController } from './tasks.interface';
import { ITASKS_SERVICE } from '../service/tasks.interface';
import { ITasksService } from '../service/tasks.interface';
import { Task } from '../entity/tasks.entity';
import { CreateTaskDTO } from '../dto/create-task-dto';
import { UpdateTaskDTO } from '../dto/update-task.dto';
import { TasksMapper } from '../mapper/tasks.mapper';
import { PriorityTypes } from '../enum/priority.enum';

@Controller('tasks')
export class TasksController implements ITasksController {
  constructor(
    @Inject(ITASKS_SERVICE) private readonly tasksService: ITasksService,
  ) {}

  @Get('/all')
  getAllTasks(): Promise<Task[]> {
    return this.tasksService.getAllTasks();
  }

  @Get('/view/:id')
  getTask(@Param('id') id: string): Promise<Task> {
    return this.tasksService.getTask(Number(id));
  }

  @Get('/view/title/:title')
  getByTitle(@Param('title') title: string): Promise<Task[]> {
    return this.tasksService.getByTitle(title);
  }

  @Get('/view/priority/:priority')
  getByPriority(@Param('priority') priority: PriorityTypes) {
    return this.tasksService.getByPriority(priority);
  }

  @Post('/new')
  createTask(@Body() body: CreateTaskDTO): Promise<Task> {
    const task = TasksMapper.fromCreateDTOToCreateEntity(body);
    return this.tasksService.createTask(task);
  }

  @Post('/edit')
  updateTask(@Body() body: UpdateTaskDTO): Promise<Task> {
    const task = TasksMapper.fromUpdateDTOToUpdateEntity(body);
    return this.tasksService.updateTask(task);
  }

  @Delete('/delete/:id')
  deleteTask(@Param('id') id: string): Promise<{ success: boolean }> {
    return this.tasksService.deleteTask(Number(id));
  }
}
