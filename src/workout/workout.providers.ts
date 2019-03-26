import { Connection } from 'mongoose';
import { WorkoutSchema } from './schemas/workout.schema';

export const workoutProviders = [
  {
    provide: 'Workout',
    useFactory: (connection: Connection) => connection.model('workouts', WorkoutSchema),
    inject: ['DbConnectionToken'],
  },
];