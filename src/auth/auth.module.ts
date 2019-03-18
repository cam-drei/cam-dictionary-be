import { Module, HttpModule } from '@nestjs/common';
import { AuthResolvers } from './auth.resolvers';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { CommonModule } from '../common/common.module';
import { MongooseModule } from '@nestjs/mongoose';
import { TemporaryPasswordSchema } from './schemas/temporary-password.schema';
import { TemporaryPasswordService } from './temporary-password.service';
import { PassportModule } from '@nestjs/passport';
import { GqlAuthGuard } from './gqlauth.guard';
import { HttpStrategy } from './http.strategy';
import { temporaryPasswordProviders } from './temporary-password.providers';
import { DatabaseModule } from '../database/database.module';

@Module({
  providers: [
    AuthService,
    AuthResolvers,
    TemporaryPasswordService,
    ...temporaryPasswordProviders,
    GqlAuthGuard,
    HttpStrategy,
  ],
  imports: [
    PassportModule.register({ defaultStrategy: 'bearer' }),
    UserModule,
    HttpModule,
    CommonModule,
    DatabaseModule,
  ],
  exports: [GqlAuthGuard],
})
export class AuthModule {}
