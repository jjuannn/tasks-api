import { Module } from '@nestjs/common';
import { TasksService } from './service/tasks.service';
import { TasksController } from './controller/tasks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entity/tasks.entity';
import { TasksRepository } from './repository/tasks.repository';
import { ITASKS_SERVICE } from './service/tasks.interface';
import { ITASKS_REPOSTORY } from './repository/tasks.interface';

@Module({
  imports: [TypeOrmModule.forFeature([Task])],
  providers: [
    { useClass: TasksService, provide: ITASKS_SERVICE },
    { useClass: TasksRepository, provide: ITASKS_REPOSTORY },
  ],
  controllers: [TasksController],
})
export class TasksModule {}

/** NOTE
 * Workaround to implement interfaces in class constructor
 * https://jasonwhite.xyz/posts/2020/10/20/nestjs-dependency-injection-decoupling-services-with-interfaces/
 *
 */
