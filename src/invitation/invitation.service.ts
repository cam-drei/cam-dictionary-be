import { Injectable, Inject } from '@nestjs/common';
import { IUser } from 'src/user/schemas/user.schema';
import { IInvitation, INVITE_METHOD } from './schemas/invitation.schema';
import { Model, mongo } from 'mongoose';
import { URL } from 'url';
@Injectable()
export class InvitationService {
  constructor(
    @Inject('Invitation')
    private readonly InvitationModel: Model<IInvitation>,
  ) {}

  public async trackInvitation(code: string): Promise<void> {
    const invitation = await this.fetchByCode(code);
    if (invitation) {
      invitation.set({
        clicks: invitation.clicks + 1,
      });
      invitation.save();
    }
  }

  public async fetchByReferrerAndMethod(
    referrer: IUser,
    method: INVITE_METHOD,
  ): Promise<IInvitation> {
    return await this.InvitationModel.findOne({
      referrer,
      method,
    });
  }

  public async fetchByCode(code: string): Promise<IInvitation> {
    return await this.InvitationModel.findOne({
      code,
    });
  }

  public async insertInvitation(
    referrer: IUser,
    method: INVITE_METHOD,
  ): Promise<IInvitation> {
    const attrs = {
      referrer,
      method,
      code: new mongo.ObjectId().toHexString(),
    };

    const invitation = new this.InvitationModel(attrs);
    await invitation.save();

    return invitation;
  }

  public async generateInvitationLink(
    referrer: IUser,
    method: INVITE_METHOD,
  ): Promise<string> {
    let invitation = await this.fetchByReferrerAndMethod(referrer, method);

    if (!invitation) {
      invitation = await this.insertInvitation(referrer, method);
    }

    return new URL(
      `/invite/${invitation.code}`,
      process.env.API_ROOT_URL,
    ).toString();
  }
}
