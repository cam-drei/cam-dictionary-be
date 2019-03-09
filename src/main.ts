import * as dotenv from 'dotenv';
dotenv.config();

// @TODO: Remove these 2 lines of code for prod environment
import * as mongoose from 'mongoose';
mongoose.set('debug', true);

import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(ApplicationModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
