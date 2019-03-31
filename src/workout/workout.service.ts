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
    const randomWorkouts = this.shuffleArray(input);

    if (randomWorkouts.length === num) {
      return randomWorkouts;
    } else if (randomWorkouts.length > num) {
      return randomWorkouts.slice(0, num - 1);
    } else {
      while (randomWorkouts.length < num) {
        randomWorkouts.push(undefined);
      }
      return randomWorkouts;
    }
  }

  private groupWorkoutGenerator(
    input: Workout[],
  ): WorkoutGeneratorResultItem[] {
    const result = [] as WorkoutGeneratorResultItem[];

    result.push({ warmup: input[0], main: input[1], coolDown: input[2] });
    result.push({ warmup: input[3], main: input[4], coolDown: input[5] });
    result.push({ warmup: input[6], main: input[7], coolDown: input[8] });

    return result;
  }

  private shuffleArray([...input]: Workout[]) {
    for (let i = input.length; i > 0; --i)
      // tslint:disable-next-line:no-bitwise
      input.push(input.splice((Math.random() * i) | 0, 1)[0]);
    return input;
  }
}
