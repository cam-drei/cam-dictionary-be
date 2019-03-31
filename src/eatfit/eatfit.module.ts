import { Module } from '@nestjs/common';
import { EatFitService } from './eatfit.service';
import { EatFitResolvers } from './eatfit.resolvers';
import { PassportModule } from '@nestjs/passport';
import { DatabaseModule } from '../database/database.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    DatabaseModule,
    PassportModule.register({ defaultStrategy: 'bearer' }),
    UserModule,
  ],
  providers: [EatFitService, EatFitResolvers],
  exports: [EatFitService],
})
export class EatFitModule {}
