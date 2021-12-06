if (process.env.NODE_ENV !== 'production') {
  const config = require('dotenv').config();
  if (config.error) {
    throw config.error;
  }
}
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// main.ts is the entry point of the app
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
