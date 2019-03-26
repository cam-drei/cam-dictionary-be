import { Injectable, Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import { IWorkout } from './schemas/workout.schema';
import {
  WorkoutGeneratorInput,
  Workout,
  WorkoutGeneratorResultItem,
} from 'src/graphql.schema';

const RANDOM_WORKOUT_NUMBER = 9;

@Injectable()
export class WorkoutService {
  constructor(
    @Inject('Workout') private readonly WorkoutModel: Model<IWorkout>,
  ) {}

  public async generateWorkout(
    input: WorkoutGeneratorInput,
  ): Promise<WorkoutGeneratorResultItem[]> {
    const { duration } = input;
    const workoutResult = await this.WorkoutModel.find(input).exec();

    if (!workoutResult) return undefined;
    const convertedResult = workoutResult.map((item: IWorkout) =>
      item.toJSON(),
    );

    const randomWorkouts = this.getRandomWorkout(
      convertedResult,
      RANDOM_WORKOUT_NUMBER,
    );

    const groupWorkouts = this.groupWorkoutGenerator(randomWorkouts);
    return groupWorkouts;
  }

  private getRandomWorkout(input: Workout[], num: number) {
    const randomWorkouts = [];
    let i: number;
    for (i = 0; i < num; i++) {
      const item = input[Math.floor(Math.random() * input.length)];
      randomWorkouts.push(item);
    }

    return randomWorkouts;
  }

  private groupWorkoutGenerator(
    input: Workout[],
  ): WorkoutGeneratorResultItem[] {
    const result = [] as WorkoutGeneratorResultItem[];

    result.push({ warmup: input[0], coolDown: input[1], main: input[2] });
    result.push({ warmup: input[3], coolDown: input[4], main: input[5] });
    result.push({ warmup: input[6], coolDown: input[7], main: input[8] });

    return result;
  }
}
