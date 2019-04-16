import { Injectable, Inject } from '@nestjs/common';
import { IUser } from '../user/schemas/user.schema';
import { IEmailConfirmation } from './schemas/email-confirmation.schema';
import { SmsService } from '../common/sms.service';
import { Model, mongo } from 'mongoose';

@Injectable()
export class EmailConfirmationService {
  constructor(
    private readonly smsService: SmsService,
    @Inject('EmailConfirmation')
    private readonly ConfirmationModel: Model<IEmailConfirmation>,
  ) {}

  public async confirm(token: string): Promise<boolean> {
    const confimationDoc = await this.ConfirmationModel.findOne({
      token,
    })
      .populate('user')
      .exec();

    if (!confimationDoc) {
      return false;
    }

    confimationDoc.remove();

    const user = confimationDoc.user;
    user.emailConfirmed = true;
    user.save();

    return true;
  }

  public async createToken(user: IUser): Promise<IEmailConfirmation> {
    await this.deleteCurrentRecord(user);

    const confirmationAttrs = {
      user,
      token: new mongo.ObjectId().toHexString(),
    };

    const confirmation = new this.ConfirmationModel(confirmationAttrs);
    await confirmation.save();

    return confirmation;
  }

  public async findByUser(user: IUser): Promise<IEmailConfirmation> {
    return await this.ConfirmationModel.findOne({
      user,
    }).exec();
  }

  private async deleteCurrentRecord(user: IUser): Promise<void> {
    await this.ConfirmationModel.deleteMany({ user }).exec();
  }
}
