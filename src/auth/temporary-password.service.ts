import { Injectable, Inject } from '@nestjs/common';
import { IUser } from '../user/schemas/user.schema';
import { ITemporaryPassword } from './schemas/temporary-password.schema';
import { SmsService } from '../common/sms.service';
import { Model } from 'mongoose';

@Injectable()
export class TemporaryPasswordService {
  constructor(
    private readonly smsService: SmsService,
    @Inject('TemporaryPassword')
    private readonly PasswordModel: Model<ITemporaryPassword>,
  ) {}

  private randomPassword(): string {
    const low = 1000;
    const high = 9999;
    return Math.floor(Math.random() * (high - low) + low).toString();
  }

  async deleteCurrentRecord(user: IUser): Promise<void> {
    await this.PasswordModel.deleteMany({ user }).exec();
  }

  async generateTemporaryPassword(user: IUser): Promise<void> {
    await this.deleteCurrentRecord(user);

    const passwordAttrs = {
      user,
      password: this.randomPassword(),
    };

    const temporyPasswor = new this.PasswordModel(passwordAttrs);
    await temporyPasswor.save();

    const message = `Your verification code for FitApp is: ${
      passwordAttrs.password
    }`;
    this.smsService.sendText(user.phone, message);
  }

  async findByUser(user: IUser): Promise<ITemporaryPassword> {
    return await this.PasswordModel.findOne({
      user,
    }).exec();
  }
}
