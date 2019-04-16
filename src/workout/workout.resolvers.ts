import { WorkoutService } from './workout.service';
import { UseGuards, Logger, ParseIntPipe } from '@nestjs/common';
import {
  Resolver,
  Args,
  Query,
  Mutation,
  Context,
  GqlExecutionContext,
} from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/auth/gqlauth.guard';
import { WorkoutGeneratorInput, Workout, WorkoutGeneratorResultItem } from 'src/graphql.schema';

@Resolver('Workout')
export class WorkoutResolvers {
  private readonly logger = new Logger(WorkoutResolvers.name);
  constructor(private readonly workoutService: WorkoutService) {}

  @Query('generateWorkout')
  @UseGuards(GqlAuthGuard)
  async generateWorkout(
    @Context() context: any,
    @Args('params') input: WorkoutGeneratorInput,
  ): Promise<WorkoutGeneratorResultItem[]> {
    this.logger.log('Generate workout');
    return await this.workoutService.generateWorkout(input);
  }
}
