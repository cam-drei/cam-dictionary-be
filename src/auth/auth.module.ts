import { Module } from '@nestjs/common';
import { AuthResolvers } from './auth.resolvers';
import { AuthService } from './auth.service';

@Module({
  providers: [AuthService, AuthResolvers],
})
export class AuthModule {}
