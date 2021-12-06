import { Inject, Injectable } from '@nestjs/common';
import { TasksDTO } from '../dto/tasks.dto';
import { ITasksService } from './tasks.interface';
import { NotFoundException } from '@nestjs/common';
import { ITASKS_REPOSTORY } from '../repository/tasks.interface';
import { ITasksRepository } from '../repository/tasks.interface';

@Injectable()
export class TasksService implements ITasksService {
  constructor(
    @Inject(ITASKS_REPOSTORY) private tasksRepository: ITasksRepository,
  ) {}

  tasks: TasksDTO[] = [
    {
      id: 1,
      title: 'Ir al super',
      description: 'Tengo que comprar pan lactal y leche',
      hasHighPriority: true,
    },
    {
      id: 2,
      title: 'Hacer la tarea de la escuela',
      description: 'Tengo que entregar la tarea de Matematica y la de Lengua',
      hasHighPriority: true,
    },
    {
      id: 3,
      title: 'Tender la cama',
      description: 'Tengo que tender mi cama con las sabanas nuevas',
      hasHighPriority: true,
    },
    {
      id: 4,
      title: 'Estudiar',
      description: 'Tengo que estudiar para la prueba de Biologia',
      hasHighPriority: true,
    },
    {
      id: 5,
      title: 'Cocinar',
      description: 'Tengo que dejar lista mi cena ',
      hasHighPriority: true,
    },
  ];

  getAllTasks(): Promise<TasksDTO[]> {
    const tasks = this.tasks;

    if (!tasks) {
      throw new NotFoundException('Cannot find tasks');
    }
    return this.tasksRepository.getAllTasks();
  }

  getTask(id: number): TasksDTO {
    const task = this.tasks.find((task) => task.id === id);

    if (!task) {
      throw new NotFoundException(`Cannot find task with id ${id}`);
    }

    return task;
  }

  createTask(task: TasksDTO): TasksDTO[] {
    this.tasks = [...this.tasks, task];
    return this.tasks;
  }
}
