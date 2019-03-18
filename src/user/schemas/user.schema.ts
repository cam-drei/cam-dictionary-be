import { Document, Schema } from 'mongoose';

export const UserSchema = new Schema({
  uid: String,
  phone: String,
  name: String,
  email: String,
  gender: String,
  birthday: String,
  heightUnit: String,
  heightValue: Number,
  weightUnit: String,
  weightValue: Number,
  fitnessGoal: String,
  provider: String,
  providerAccessToken: String,
  providerUid: String,
});

UserSchema.set('toJSON', {
  virtuals: true,
});

export interface IUser extends Document {
  id: string;
  phone?: string;
  name?: string;
  email?: string;
  gender?: string;
  birthday?: string;
  fitnessGoal?: string;
  provider: string;
  providerAccessToken?: string;
  providerUid?: string;
  _id: string;
}

export enum USER_PROVIDER {
  PHONE = 'Phone',
  FACEBOOK = 'Facebook',
  GOOGLE = 'Google',
}
