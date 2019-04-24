import { Document, Schema } from 'mongoose';
import { IUser } from '../../user/schemas/user.schema';

export interface IInvitation extends Document {
  readonly referrer: IUser;
  readonly code: string;
  readonly method: string;
  readonly clicks: number;
}

export enum INVITE_METHOD {
  EMAIL = 'EMAIL',
  FACEBOOK = 'FACEBOOK',
  TWITTER = 'TWITTER',
  PHONE = 'PHONE',
}

export const InvitationSchema = new Schema({
  referrer: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  code: {
    type: String,
    default: '',
  },
  method: {
    type: INVITE_METHOD,
  },
  clicks: {
    type: Number,
    default: 0,
  },
  createdAt: { type: Date, default: Date.now },
});
