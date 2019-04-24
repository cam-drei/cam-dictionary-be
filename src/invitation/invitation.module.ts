import { Module } from '@nestjs/common';
import { InvitationService } from './invitation.service';
import { InvitationResolvers } from './invitation.resolvers';
import { invitationProviders } from './invitation.providers';
import { PassportModule } from '@nestjs/passport';
import { DatabaseModule } from '../database/database.module';
import { CommonModule } from '../common/common.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    DatabaseModule,
    PassportModule.register({ defaultStrategy: 'bearer' }),
    CommonModule,
    UserModule,
  ],
  providers: [InvitationService, InvitationResolvers, ...invitationProviders],
  exports: [InvitationService],
})
export class InvitationModule {}
