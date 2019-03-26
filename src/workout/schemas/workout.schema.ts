import { Document, Schema } from 'mongoose';

export const WorkoutSchema = new Schema({
  index: String,
  workouts: String,
  muscleGroup: String,
  class: String,
  duration: String,
  targetBMI: String,
  equipment: String,
  heartRate: String,
  medium: String,
  intensity: String,
});

WorkoutSchema.set('toJSON', {
  virtuals: true,
});

export interface IWorkout extends Document {
  id: string;
  index: string;
  workouts: string;
  muscleGroup: string;
  class: string;
  duration: string;
  targetBMI: string;
  equipment: string;
  heartRate: string;
  medium: string;
  intensity: string;
}
