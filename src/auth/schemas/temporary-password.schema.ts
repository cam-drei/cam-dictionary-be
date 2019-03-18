import { Document, Schema } from 'mongoose';
import { IUser } from '../../user/schemas/user.schema';
import * as crypto from 'crypto';
import { bool } from 'aws-sdk/clients/signer';

export interface ITemporaryPassword extends Document {
  readonly user: IUser;
  readonly password: string;
  readonly salt: string;
  authenticate(password: string): bool;
}

export const TemporaryPasswordSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  password: {
    type: String,
    default: '',
  },
  salt: {
    type: String,
  },
  expireAt: {
    type: Date,
    default: Date.now,
    index: { expires: '5m' },
  },
});

/**
 * Hook a pre save method to hash the password
 */
TemporaryPasswordSchema.pre<any>('save', function(next) {
  if (this.password && this.isModified('password')) {
    this.salt = crypto.randomBytes(16).toString('base64');
    this.password = this.hashPassword(this.password);
  }

  next();
});

/**
 * Create instance method for hashing a password
 */
TemporaryPasswordSchema.methods.hashPassword = function(password) {
  if (this.salt && password) {
    return crypto
      .pbkdf2Sync(password, new Buffer(this.salt, 'base64'), 10000, 64, 'SHA1')
      .toString('base64');
  } else {
    return password;
  }
};

/**
 * Create instance method for authenticating user
 */
TemporaryPasswordSchema.methods.authenticate = function(password) {
  return this.password === this.hashPassword(password);
};
