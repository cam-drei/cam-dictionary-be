import { Injectable, Inject } from '@nestjs/common';
import { SocialLoginDto } from '../auth/dto/social-login.dto';
import { SendPasswordToPhoneDto } from '../auth/dto/send-password-to-phone.dto';
import { Model } from 'mongoose';
import { IUser, USER_PROVIDER } from './schemas/user.schema';
import { SocialLoginInput, UpdateUserInput } from 'src/graphql.schema';
import { mongo } from 'mongoose';
@Injectable()
export class UserService {
  constructor(@Inject('User') private readonly UserModel: Model<IUser>) {}

  async getProfileBySocial(socialLogin: SocialLoginInput): Promise<IUser> {
    const existedUser = await this.UserModel.findOne({
      provider: socialLogin.provider,
      providerUid: socialLogin.providerUid,
    }).exec();
    return existedUser ? existedUser.toJSON() : existedUser;
  }

  async getProfileById(id: string): Promise<IUser> {
    const existedUser = await this.UserModel.findById(id).exec();
    return existedUser ? existedUser.toJSON() : existedUser;
  }

  async createSocialProfile(socialProfile: SocialLoginDto): Promise<IUser> {
    const userModel = new this.UserModel(socialProfile);
    const newUser = await userModel.save();
    return newUser.toJSON();
  }

  async getProfileByPhone(phone: string): Promise<IUser> {
    const existedUser = await this.UserModel.findOne({
      phone,
      provider: USER_PROVIDER.PHONE,
    }).exec();

    return existedUser ? existedUser.toJSON() : existedUser;
  }

  async createPhoneProfile(params: SendPasswordToPhoneDto): Promise<IUser> {
    const userModel = new this.UserModel(params);
    const newUser = await userModel.save();
    return newUser.toJSON();
  }

  async updateUserProfile(id: string, user: UpdateUserInput): Promise<IUser> {
    const _id = new mongo.ObjectId(id);
    await this.UserModel.findOneAndUpdate({ _id }, user);
    const updatedUser = await this.UserModel.findById(id);
    return updatedUser ? updatedUser.toJSON() : updatedUser;
  }
}
