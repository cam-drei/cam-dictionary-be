import { Injectable, Inject } from '@nestjs/common';
import { SocialLoginDto } from '../auth/dto/social-login.dto';
import { SendPasswordToPhoneDto } from '../auth/dto/send-password-to-phone.dto';
import { Model } from 'mongoose';
import { IUser, USER_PROVIDER } from './schemas/user.schema';
import { SocialLoginInput, UpdateUserInput } from 'src/graphql.schema';
import { mongo } from 'mongoose';
import { EmailConfirmationService } from './email-confirmation.service';
import { EmailService } from '../common/email.service';

@Injectable()
export class UserService {
  constructor(
    @Inject('User') private readonly UserModel: Model<IUser>,
    @Inject('EmailConfirmationService')
    private readonly emailConfirmationService: EmailConfirmationService,
    @Inject('EmailService')
    private readonly emailService: EmailService,
  ) {}

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
    const doc = await this.UserModel.findOne({ _id });
    doc.set(user);

    if (doc.email && doc.isModified('email')) {
      const emailConfirmation = await this.emailConfirmationService.createToken(
        doc,
      );
      this.emailService.sendEmailConfirmation(emailConfirmation);
    }

    await doc.save();

    return doc ? doc.toJSON() : doc;
  }
}
