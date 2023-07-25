import { NotFoundException } from '@nestjs/common';
import { TestingModule } from '@nestjs/testing';
import { Task } from '../../tasks/entity/tasks.entity';
import { TasksRepository } from '../../tasks/repository/tasks.repository';
import { MockType, createTestingModule } from '../mock';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ITASKS_REPOSTORY } from '../../tasks/repository/tasks.interface';
import { PriorityTypes } from '../../tasks/enum/priority.enum';
import { createTaskMock, databaseTask, updateTaskMock } from '../mock-entities';

describe('Task Repository Unit Testing', () => {
  let tasksRepository: TasksRepository;
  let mockTasksRepository: MockType<Repository<Task>>;

  beforeEach(async () => {
    const module: TestingModule = await createTestingModule();

    tasksRepository = module.get<TasksRepository>(ITASKS_REPOSTORY);
    mockTasksRepository = module.get(getRepositoryToken(Task));
  });

  it('Should instance repository correctly', () => {
    expect(tasksRepository).toBeDefined();
    expect(mockTasksRepository).toBeDefined();
  });

  it('Should save an entity correctly', async () => {
    jest
      .spyOn(mockTasksRepository, 'save')
      .mockImplementation(() => Promise.resolve(databaseTask));

    const create = await tasksRepository.createTask(createTaskMock);

    expect(mockTasksRepository.save).toHaveBeenCalledTimes(1);
    expect(mockTasksRepository.save).toHaveBeenCalledWith(createTaskMock);
    expect(create).toEqual(databaseTask);
  });

  it('Should return all entities', async () => {
    const databaseTasks = [databaseTask, { ...databaseTask, id: 2 }];
    jest
      .spyOn(mockTasksRepository, 'find')
      .mockImplementationOnce(() => Promise.resolve(databaseTasks));

    const tasks = await tasksRepository.getAllTasks();

    expect(tasks.length).toEqual(2);
    expect(tasks).toEqual(databaseTasks);
  });

  it('Should throw error if cannot find task with the specified ID on get', async () => {
    const taskId = 1;

    jest
      .spyOn(mockTasksRepository, 'findOne')
      .mockImplementationOnce(() => Promise.resolve(undefined));

    try {
      await tasksRepository.getTask(taskId);
    } catch (err) {
      expect(err).toBeInstanceOf(NotFoundException);
      expect(err.message).toEqual(`Cannot find task with id ${taskId}`);
    }

    expect(mockTasksRepository.findOne).toHaveBeenCalledWith({
      where: { id: taskId },
    });
  });

  it('Should return entity if can find one with the specified ID', async () => {
    const taskId = 1;

    jest
      .spyOn(mockTasksRepository, 'findOne')
      .mockImplementationOnce(() => Promise.resolve(databaseTask));

    const get = await tasksRepository.getTask(1);

    expect(get).toEqual(databaseTask);
    expect(mockTasksRepository.findOne).toHaveBeenCalledWith({
      where: { id: taskId },
    });
  });

  it('Should throw error if cannot find task with the specified ID on update', async () => {
    jest
      .spyOn(tasksRepository, 'getTask')
      .mockImplementationOnce(() => Promise.resolve(null));

    try {
      await tasksRepository.updateTask(updateTaskMock);
    } catch (err) {
      expect(err).toBeInstanceOf(NotFoundException);
      expect(err.message).toEqual(
        `Cannot update task with id ${updateTaskMock.id} as it does not exist`,
      );
    }
  });

  it('Should call update repository methods if can find a task with the specified id', async () => {
    const queryBuilderMethodsMock = {
      select: jest.fn().mockReturnThis(),
      update: jest.fn().mockReturnThis(),
      set: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      setParameter: jest.fn().mockReturnThis(),
      execute: jest.fn().mockImplementation(() => ({ affected: 1 })),
    };

    jest
      .spyOn(tasksRepository, 'getTask')
      .mockImplementation(() => Promise.resolve(databaseTask));

    mockTasksRepository.createQueryBuilder.mockImplementation(
      jest.fn(() => queryBuilderMethodsMock),
    );

    const updated = await tasksRepository.updateTask(updateTaskMock);

    expect(updated).toEqual(databaseTask);
    expect(mockTasksRepository.createQueryBuilder).toHaveBeenCalledTimes(1);
    expect(queryBuilderMethodsMock.set).toHaveBeenCalledWith({
      title: updateTaskMock.title,
      description: updateTaskMock.description,
      priority: updateTaskMock.priority,
    });
    expect(queryBuilderMethodsMock.where).toHaveBeenCalledWith('id=:id');
    expect(queryBuilderMethodsMock.setParameter).toHaveBeenCalledWith(
      'id',
      updateTaskMock.id,
    );

    expect(tasksRepository.getTask).toHaveBeenCalledTimes(2);
    expect(tasksRepository.getTask).toHaveBeenNthCalledWith(1, databaseTask.id);
    expect(tasksRepository.getTask).toHaveBeenNthCalledWith(2, databaseTask.id);
  });

  it('Should get task by priority', async () => {
    jest
      .spyOn(mockTasksRepository, 'find')
      .mockImplementationOnce(() => Promise.resolve([databaseTask]));

    const tasks = await tasksRepository.getByPriority(PriorityTypes.MEDIUM);

    expect(mockTasksRepository.find).toHaveBeenCalledWith({
      where: { priority: PriorityTypes.MEDIUM },
    });

    expect(tasks).toEqual([databaseTask]);
  });

  it('Should throw an error if cannot update task because cannot found it', async () => {
    const taskId = 1;

    jest
      .spyOn(mockTasksRepository, 'delete')
      .mockImplementationOnce(() => Promise.resolve({ affected: 0 }));

    try {
      await tasksRepository.deleteTask(taskId);
    } catch (err) {
      expect(err).toBeInstanceOf(NotFoundException);
      expect(err.message).toEqual(
        `Cannot delete task with id ${taskId} as it does not exist`,
      );
    }

    expect(mockTasksRepository.delete).toHaveBeenCalledWith({ id: taskId });
  });

  it('Should throw an error if cannot update task because cannot found it', async () => {
    const taskId = 1;

    jest
      .spyOn(mockTasksRepository, 'delete')
      .mockImplementationOnce(() => Promise.resolve({ affected: 1 }));

    const deleted = await tasksRepository.deleteTask(taskId);

    expect(deleted).toEqual({ success: true });
    expect(mockTasksRepository.delete).toHaveBeenCalledWith({ id: taskId });
  });

  it('Should get task by title', async () => {
    const queryBuilderMethodsMock = {
      select: jest.fn().mockReturnThis(),
      update: jest.fn().mockReturnThis(),
      set: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      setParameter: jest.fn().mockReturnThis(),
      execute: jest.fn().mockImplementation(() => [databaseTask]),
    };

    mockTasksRepository.createQueryBuilder.mockImplementation(
      jest.fn(() => queryBuilderMethodsMock),
    );

    const title = 'Title';

    const tasks = await tasksRepository.getByTitle(title);

    expect(mockTasksRepository.createQueryBuilder).toHaveBeenCalledTimes(1);
    expect(tasks).toEqual([databaseTask]);
    expect(queryBuilderMethodsMock.where).toHaveBeenCalledWith(
      `LOWER(title) LIKE '${title}%'`,
    );
  });
});
