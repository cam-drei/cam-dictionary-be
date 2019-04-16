import { Document, Schema } from 'mongoose';
import { TokenService } from 'src/auth/token.service';

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
  isAcceptAgreement: {
    type: Boolean,
    default: false,
  },
  emailConfirmed: {
    type: Boolean,
    default: false,
  },
});

UserSchema.set('toJSON', {
  virtuals: true,
});

/**
 * Hook a pre save method to send confirmation email
 */
UserSchema.pre<any>('save', function(next) {
  if (this.email && this.isModified('email')) {
    this.emailConfirmed = false;
  }

  next();
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

UserSchema.virtual('accessToken').get(function() {
  const accessToken = TokenService.encode({ id: this.id });
  return accessToken;
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
  isAcceptAgreement?: boolean;
  emailConfirmed?: boolean;
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
