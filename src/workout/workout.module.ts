import { Module } from '@nestjs/common';
import { WorkoutService } from './workout.service';
import { WorkoutSchema } from './schemas/workout.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { WorkoutResolvers } from './workout.resolvers';
import { PassportModule } from '@nestjs/passport';
import { workoutProviders } from './workout.providers';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [
    DatabaseModule,
    PassportModule.register({ defaultStrategy: 'bearer' }),
  ],
  providers: [WorkoutService, WorkoutResolvers, ...workoutProviders],
  exports: [WorkoutService],
})
export class WorkoutModule {}
