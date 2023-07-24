import { TestingModule, Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Task } from '../tasks/entity/tasks.entity';
import { TasksRepository } from '../tasks/repository/tasks.repository';
import { TasksService } from '../tasks/service/tasks.service';
import { Repository } from 'typeorm';
import { ITASKS_SERVICE } from '../tasks/service/tasks.interface';
import { ITASKS_REPOSTORY } from '../tasks/repository/tasks.interface';

export type MockType<T> = {
  [P in keyof T]?: jest.Mock<any> | any;
};

export const repositoryMockFactory: () => MockType<Repository<any>> = jest.fn(
  () => ({
    find: jest.fn((entity) => entity),
    findOne: jest.fn((entity) => entity),
    findByIds: jest.fn((entity) => entity),
    save: jest.fn((entity) => entity),
    softDelete: jest.fn((entity) => entity),
    findAndCount: jest.fn((entity) => entity),
    count: jest.fn((entity) => entity),
    createQueryBuilder: jest.fn((entity) => entity),
    update: jest.fn((entity) => entity),
    upsert: jest.fn((entity) => entity),
    delete: jest.fn((entity) => entity),
  }),
);

const services = [
  TasksService,
  {
    useExisting: TasksService,
    provide: ITASKS_SERVICE,
  },
];

const providers = [
  TasksRepository,
  {
    useExisting: TasksRepository,
    provide: ITASKS_REPOSTORY,
  },
];

const repositories = [
  { provide: getRepositoryToken(Task), useFactory: repositoryMockFactory },
];

export const createTestingModule = async (): Promise<TestingModule> =>
  await Test.createTestingModule({
    providers: [...services, ...repositories, ...providers],
  }).compile();
