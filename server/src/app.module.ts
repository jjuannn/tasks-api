import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { Task } from './tasks/entity/tasks.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      database: process.env.DATABASE,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      host: process.env.DATABASE_HOST,
      type: 'postgres',
      ssl: { rejectUnauthorized: false },
      entities: [Task],
      retryAttempts: 1,
      // no usar en produccion
      synchronize: true,
      dropSchema: true,
      // no usar en produccion
    }),
    TasksModule,
  ],
  controllers: [],
  providers: [],
})
//
export class AppModule {
  constructor(private connection: Connection) {}
}
