import { Injectable, UnauthorizedException } from '@nestjs/common';
import { IUser } from '../user/schemas/user.schema';
import { UserService } from '../user/user.service';
import { SmsService } from '../common/sms.service';
import { PhoneLoginDto } from './dto/phone-login.dto';
import { TemporaryPasswordService } from './temporary-password.service';
import { ITemporaryPassword } from './schemas/temporary-password.schema';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly temporaryPasswordService: TemporaryPasswordService,
  ) {}

  async loginByPhone(params: PhoneLoginDto): Promise<IUser> {
    const user = await this.userService.getByPhoneProviderInfo(params.phone);
    if (!user) {
      throw new UnauthorizedException('Phone not exist!');
    }

    const passwordModel = await this.temporaryPasswordService.findByUser(user);
    if (!passwordModel || !passwordModel.authenticate(params.password)) {
      throw new UnauthorizedException('Password invalid!');
    }

    return user;
  }
}
