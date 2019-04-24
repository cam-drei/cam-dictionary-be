import { Module } from '@nestjs/common';
import { WebController } from './web.controller';
import { WebService } from './web.service';
import { UserModule } from '../user/user.module';
import { InvitationModule } from 'src/invitation/invitation.module';

@Module({
  imports: [UserModule, InvitationModule],
  controllers: [WebController],
  providers: [WebService],
})
export class WebModule {}
