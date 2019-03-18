import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserSchema } from './schemas/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { UserResolvers } from './user.resolvers';
import { PassportModule } from '@nestjs/passport';
import { userProviders } from './user.providers';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [
    DatabaseModule,
    PassportModule.register({ defaultStrategy: 'bearer' }),
  ],
  providers: [UserService, UserResolvers, ...userProviders],
  exports: [UserService],
})
export class UserModule {}
