import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolvers } from './user.resolvers';
import { EmailConfirmationService } from './email-confirmation.service';
import { emailConfirmationProviders } from './email-confirmation.providers';
import { PassportModule } from '@nestjs/passport';
import { userProviders } from './user.providers';
import { DatabaseModule } from '../database/database.module';
import { CommonModule } from '../common/common.module';

@Module({
  imports: [
    DatabaseModule,
    PassportModule.register({ defaultStrategy: 'bearer' }),
    CommonModule,
  ],
  providers: [
    UserService,
    UserResolvers,
    ...userProviders,
    EmailConfirmationService,
    ...emailConfirmationProviders,
  ],
  exports: [UserService, EmailConfirmationService],
})
export class UserModule {}
