import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { IUser } from '../user/schemas/user.schema';
import { UserService } from '../user/user.service';
import { PhoneLoginDto } from './dto/phone-login.dto';
import { TemporaryPasswordService } from './temporary-password.service';

@Injectable()
export class AuthService {
  private readonly logger: Logger = new Logger(AuthService.name);

  private static cert: string = `N33cSq4Ne6F6j4A9`;

  constructor(
    private readonly userService: UserService,
    private readonly temporaryPasswordService: TemporaryPasswordService,
  ) {}

  async loginByPhone(params: PhoneLoginDto): Promise<IUser> {
    const user = await this.userService.getProfileByPhone(params.phone);
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
