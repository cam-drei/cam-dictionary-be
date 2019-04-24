import { InvitationService } from './invitation.service';
import { UseGuards } from '@nestjs/common';
import { Resolver, Args, Context, Mutation } from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/auth/gqlauth.guard';
import { INVITE_METHOD } from './schemas/invitation.schema';
import { UserService } from 'src/user/user.service';
import { EmailService } from 'src/common/email.service';

@Resolver('Invitation')
export class InvitationResolvers {
  constructor(
    private readonly invitationService: InvitationService,
    private readonly userService: UserService,
    private readonly emailService: EmailService,
  ) {}

  @Mutation('generateInvitationLink')
  @UseGuards(GqlAuthGuard)
  async generateInvitationLink(
    @Context() context: any,
    @Args('method') method: INVITE_METHOD,
  ): Promise<string> {
    const { user } = context.req;
    const userProfile = await this.userService.getProfileById(user.id);
    return this.invitationService.generateInvitationLink(userProfile, method);
  }

  @Mutation('sendInvitationEmail')
  @UseGuards(GqlAuthGuard)
  async sendInvitationEmail(
    @Context() context: any,
    @Args('toEmails') toEmails: string[],
  ): Promise<boolean> {
    const { user } = context.req;
    const userProfile = await this.userService.getProfileById(user.id);

    const invitationLink = await this.invitationService.generateInvitationLink(
      userProfile,
      INVITE_METHOD.EMAIL,
    );

    this.emailService.inviteFriends(toEmails, userProfile, invitationLink);

    return true;
  }
}
