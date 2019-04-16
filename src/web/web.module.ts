import { Module } from '@nestjs/common';
import { WebController } from './web.controller';
import { WebService } from './web.service';
import { UserModule } from '../user/user.module';

@Module({
  imports: [UserModule],
  controllers: [WebController],
  providers: [WebService],
})
export class WebModule {}
