import { Document, Schema } from 'mongoose';
import { TokenService } from 'src/auth/token.service';

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

export enum PAL {
  LOW = 1.2,
  MEDIUM = 1.375,
  HIGH = 1.55,
  INTENSE = 2.25,
}

export enum BODY_FAT {
  TEN = 10,
  FIFTEEN = 15,
  TWENTY = 20,
  TWENTY_FIVE = 25,
  NOT_SURE = 0,
}

export const UserSchema = new Schema({
  uid: String,
  phone: String,
  name: String,
  email: {
    type: String,
    trim: true,
    index: true,
    unique: true,
    sparse: true,
  },
  displayName: {
    type: String,
    trim: true,
    index: true,
    unique: true,
    sparse: true,
  },
  gender: String,
  birthday: String,
  heightUnit: String,
  heightValue: Number,
  weightUnit: String,
  weightValue: Number,
  waistSizeUnit: String,
  waistSizeValue: Number,
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
  pal: {
    type: Number,
    default: PAL.MEDIUM,
  },
  bodyFat: {
    type: Number,
    default: BODY_FAT.FIFTEEN,
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

UserSchema.virtual('heightInInch').get(function() {
  if (this.heightUnit === HEIGHT_UNIT.INCH) {
    return this.heightValue;
  } else {
    return this.heightValue * 0.393701;
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

UserSchema.virtual('bmiIndex').get(function() {
  // BMI = weight (kg) ÷ height2 (m2)
  const weightInKG = this.get('weightInKG') || 0;
  const heightInM = (this.get('heightInCM') || 0) / 100;
  return heightInM === 0 ? 0 : weightInKG / Math.pow(heightInM, 2);
});

UserSchema.virtual('wsrIndex').get(function() {
  // WSR = waist size (in) / height (in)
  const waistSizeValue = this.get('waistSizeValue') || 32;
  const heightInInch = this.get('heightInInch') || 0;
  return heightInInch === 0 ? 0 : waistSizeValue / heightInInch;
});

export interface IUser extends Document {
  id: string;
  phone?: string;
  name?: string;
  email?: string;
  displayName?: string;
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
  bodyFat: BODY_FAT;
  pal: PAL;
}
