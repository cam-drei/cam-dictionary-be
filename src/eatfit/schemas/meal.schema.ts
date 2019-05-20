import { Document, Schema } from 'mongoose';
import { IUser } from 'src/user/schemas/user.schema';
import { bool } from 'aws-sdk/clients/signer';
import { Meal } from 'src/graphql.schema';

export enum MEAL_TYPE {
  BREAKFAST = 'breakfast',
  LUNCH = 'lunch',
  DINNER = 'dinner',
  SNACK = 'snack',
}

export const MealSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    type: {
      type: String,
      default: MEAL_TYPE.BREAKFAST,
    },
    calories: {
      type: Number,
      default: 0,
    },
    time: {
      type: Date,
      default: Date.now(),
    },
    isDone: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

MealSchema.set('toJSON', {
  virtuals: true,
});

MealSchema.set('toObject', {
  virtuals: true,
});

MealSchema.methods.toGraphObject = function() {
  return Object.assign(this.toObject(), { time: this.time.valueOf() });
};

export interface IMeal extends Document {
  id: string;
  user: IUser;
  type: string;
  calories: number;
  time: Date;
  isDone: bool;
  toGraphObject(): Meal;
}
