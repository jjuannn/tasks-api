import { TestingModule } from '@nestjs/testing';
import { Task } from '../../tasks/entity/tasks.entity';
import { CreateTask } from '../../tasks/entity/domain/create-task.entity';
import { TasksRepository } from '../../tasks/repository/tasks.repository';
import { MockType, createTestingModule } from '../mock';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ITASKS_REPOSTORY } from '../../tasks/repository/tasks.interface';
import { PriorityTypes } from '../../tasks/enum/priority.enum';

describe('Task Repository Unit Testing', () => {
  let tasksRepository: TasksRepository;
  let mockTasksRepository: MockType<Repository<Task>>;

  beforeEach(async () => {
    const module: TestingModule = await createTestingModule();

    tasksRepository = module.get<TasksRepository>(ITASKS_REPOSTORY);
    mockTasksRepository = module.get(getRepositoryToken(Task));
  });

  const createTaskMock = new CreateTask(
    'Task Title',
    'Task Description',
    PriorityTypes.MEDIUM,
  );

  it('Should instance repository correctly', () => {
    expect(tasksRepository).toBeDefined();
    expect(mockTasksRepository).toBeDefined();
  });

  it('Should save an entity correctly', async () => {
    jest.spyOn(mockTasksRepository, 'save');

    await tasksRepository.createTask(createTaskMock);

    expect(mockTasksRepository.save).toHaveBeenCalledTimes(1);
    expect(mockTasksRepository.save).toHaveBeenCalledWith(createTaskMock);
  });
});
