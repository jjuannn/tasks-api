import { TasksRepository } from '../../tasks/repository/tasks.repository';
import { TasksService } from '../../tasks/service/tasks.service';
import { ITASKS_REPOSTORY } from '../../tasks/repository/tasks.interface';
import { createTestingModule } from '../mock';
import { TestingModule } from '@nestjs/testing';
import { createTaskMock, databaseTask, updateTaskMock } from '../mock-entities';
import { PriorityTypes } from '../../tasks/enum/priority.enum';

describe('Task Service Unit Testing', () => {
  let tasksRepository: TasksRepository;
  let tasksService: TasksService;

  beforeEach(async () => {
    const module: TestingModule = await createTestingModule();

    tasksRepository = module.get<TasksRepository>(ITASKS_REPOSTORY);
    tasksService = module.get<TasksService>(TasksService);
  });

  it('getAllTasks should call repository correctly', async () => {
    jest
      .spyOn(tasksRepository, 'getAllTasks')
      .mockImplementationOnce(() => Promise.resolve([databaseTask]));

    const tasks = await tasksService.getAllTasks();

    expect(tasks).toEqual([databaseTask]);
    expect(tasksRepository.getAllTasks).toHaveBeenCalledTimes(1);
  });

  it('getTask should call repository correctly', async () => {
    jest
      .spyOn(tasksRepository, 'getTask')
      .mockImplementationOnce(() => Promise.resolve(databaseTask));

    const taskId = 1;

    const task = await tasksService.getTask(taskId);

    expect(tasksRepository.getTask).toHaveBeenCalledWith(taskId);
    expect(task).toEqual(databaseTask);
  });

  it('getByTitle should call repository correctly', async () => {
    jest
      .spyOn(tasksRepository, 'getByTitle')
      .mockImplementationOnce(() => Promise.resolve([databaseTask]));

    const title = 'TITLE';

    const tasks = await tasksService.getByTitle(title);

    expect(tasksRepository.getByTitle).toHaveBeenCalledWith(
      title.toLowerCase(),
    );
    expect(tasks).toEqual([databaseTask]);
  });

  it('getByPriority should call repository correctly', async () => {
    jest
      .spyOn(tasksRepository, 'getByPriority')
      .mockImplementationOnce(() => Promise.resolve([databaseTask]));

    const tasks = await tasksService.getByPriority(PriorityTypes.MEDIUM);

    expect(tasksRepository.getByPriority).toHaveBeenCalledWith(
      PriorityTypes.MEDIUM,
    );
    expect(tasks).toEqual([databaseTask]);
  });

  it('createTask should call repository correctly', async () => {
    jest
      .spyOn(tasksRepository, 'createTask')
      .mockImplementationOnce(() => Promise.resolve(databaseTask));

    const task = await tasksService.createTask(createTaskMock);

    expect(tasksRepository.createTask).toHaveBeenCalledWith(createTaskMock);
    expect(task).toEqual(databaseTask);
  });

  it('updateTask should call repository correctly', async () => {
    jest
      .spyOn(tasksRepository, 'updateTask')
      .mockImplementationOnce(() => Promise.resolve(databaseTask));

    const task = await tasksService.updateTask(updateTaskMock);

    expect(tasksRepository.updateTask).toHaveBeenCalledWith(updateTaskMock);
    expect(task).toEqual(databaseTask);
  });

  it('deleteTask should call repository correctly', async () => {
    jest
      .spyOn(tasksRepository, 'deleteTask')
      .mockImplementationOnce(() => Promise.resolve({ success: true }));

    const taskId = 1;

    const taskDeleted = await tasksService.deleteTask(taskId);

    expect(tasksRepository.deleteTask).toHaveBeenCalledWith(taskId);
    expect(taskDeleted).toEqual({ success: true });
  });
});
