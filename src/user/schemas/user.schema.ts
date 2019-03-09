import { Document, Schema } from 'mongoose';

export const UserSchema = new Schema({
  uid: String,
  phone: String,
  name: String,
  email: String,
  gender: String,
  birthday: Number,
  fitnessGoal: String,
  provider: String,
  providerAccessToken: String,
  providerUid: String,
});

export interface IUser extends Document {
  id: string;
  phone?: string;
  name?: string;
  email?: string;
  gender?: string;
  birthday?: number;
  fitnessGoal?: string;
  provider: string;
  providerAccessToken?: string;
  providerUid?: string;
}
