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

UserSchema.virtual('heightInCM').get(function() {
  if (this.heightUnit === HEIGHT_UNIT.CM) {
    return this.heightValue;
  } else {
    return this.heightValue * 2.54;
  }
});

UserSchema.virtual('weightInKG').get(function() {
  if (this.weightUnit === WEIGHT_UNIT.KG) {
    return this.weightValue;
  } else {
    return this.weightValue * 0.453592;
  }
});

UserSchema.virtual('ageInYear').get(function() {
  const timestamp = parseInt(this.birthday, 10);
  const now = Date.now();

  return Math.floor((now - timestamp) / 31536000000);
});

export interface IUser extends Document {
  id: string;
  phone?: string;
  name?: string;
  email?: string;
  gender?: GENDER;
  birthday?: string;
  fitnessGoal?: FITNESS_GOAL;
  provider: USER_PROVIDER;
  providerAccessToken?: string;
  providerUid?: string;
  heightUnit: HEIGHT_UNIT;
  heightValue: number;
  weightUnit: WEIGHT_UNIT;
  weightValue: number;
  heightInCM?: number;
  weightInKG?: number;
  ageInYear?: number;
}

export enum USER_PROVIDER {
  PHONE = 'Phone',
  FACEBOOK = 'Facebook',
  GOOGLE = 'Google',
}

export enum FITNESS_GOAL {
  LOSE = 'LOSE',
  STAY = 'STAY',
  GAIN = 'GAIN',
}

export enum GENDER {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
}

export enum HEIGHT_UNIT {
  INCH = 'INCH',
  CM = 'CM',
}

export enum WEIGHT_UNIT {
  KG = 'KG',
  LBS = 'LBS',
}
