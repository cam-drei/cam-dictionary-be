import { Get, Controller, Param } from '@nestjs/common';
import { WebService } from './web.service';
import { EmailConfirmationService } from 'src/user/email-confirmation.service';
import { InvitationService } from 'src/invitation/invitation.service';

@Controller()
export class WebController {
  constructor(
    private readonly webService: WebService,
    private readonly emailConfirmationService: EmailConfirmationService,
    private readonly invitationService: InvitationService,
  ) {}

  @Get('confirm-email/:token')
  async confirmEmail(@Param('token') token: string): Promise<string> {
    const confirmed = await this.emailConfirmationService.confirm(token);
    return this.webService.renderEmailConfirmation(confirmed);
  }

  @Get('invite/:code')
  async confirmInvited(@Param('code') code: string): Promise<string> {
    this.invitationService.trackInvitation(code);
    return this.webService.renderInvitation();
  }
}
