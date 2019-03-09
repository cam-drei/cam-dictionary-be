import { Module, HttpModule } from '@nestjs/common';
import { AuthResolvers } from './auth.resolvers';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { CommonModule } from '../common/common.module';
import { MongooseModule } from '@nestjs/mongoose';
import { TemporaryPasswordSchema } from './schemas/temporary-password.schema';
import { TemporaryPasswordService } from './temporary-password.service';

@Module({
  providers: [AuthService, AuthResolvers, TemporaryPasswordService],
  imports: [
    UserModule,
    HttpModule,
    CommonModule,
    MongooseModule.forFeature([
      { name: 'TemporaryPassword', schema: TemporaryPasswordSchema },
    ]),
  ],
})
export class AuthModule {}
