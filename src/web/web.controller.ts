import { Get, Controller, Param } from '@nestjs/common';
import { WebService } from './web.service';
import { EmailConfirmationService } from 'src/user/email-confirmation.service';

@Controller()
export class WebController {
  constructor(
    private readonly webService: WebService,
    private readonly emailConfirmationService: EmailConfirmationService,
  ) {}

  @Get('confirm-email/:token')
  async confirmEmail(@Param('token') token: string): Promise<string> {
    const confirmed = await this.emailConfirmationService.confirm(token);
    return this.webService.renderEmailConfirmation(confirmed);
  }
}
