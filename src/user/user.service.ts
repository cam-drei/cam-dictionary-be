import { Injectable } from '@nestjs/common';
import { SocialLoginDto } from '../auth/dto/social-login.dto';
import { SendPasswordToPhoneDto } from '../auth/dto/send-password-to-phone.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUser } from './schemas/user.schema';
import { Provider } from '../common/enums/provider.enum';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly UserModel: Model<IUser>) {}

  async getByPhoneProviderInfo(phone: string): Promise<IUser> {
    return await this.UserModel.findOne({
      provider: Provider.Phone,
      phone,
    }).exec();
  }

  async getOrCreateBySocialProfile(
    socialProfile: SocialLoginDto,
  ): Promise<IUser> {
    const existedUser = await this.UserModel.findOne({
      provider: socialProfile.provider,
      providerUid: socialProfile.providerUid,
    }).exec();

    if (existedUser) {
      return existedUser;
    }

    const newUser = new this.UserModel(socialProfile);
    return await newUser.save();
  }

  async getOrCreateByPhone(params: SendPasswordToPhoneDto): Promise<IUser> {
    const existedUser = await this.UserModel.findOne({
      phone: params.phone,
      provider: params.provider,
    }).exec();

    if (existedUser) {
      return existedUser;
    }

    const newUser = new this.UserModel(params);
    return await newUser.save();
  }

  async update(user: IUser): Promise<IUser> {
    return await this.UserModel.updateOne({ _id: user.id }, user);
  }
}
