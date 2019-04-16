import { Document, Schema } from 'mongoose';
import { IUser } from '../../user/schemas/user.schema';

export interface IEmailConfirmation extends Document {
  readonly user: IUser;
  readonly token: string;
}

export const EmailConfirmationSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  token: {
    type: String,
    default: '',
  },
});
