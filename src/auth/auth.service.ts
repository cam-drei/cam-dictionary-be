import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { IUser } from '../user/schemas/user.schema';
import { UserService } from '../user/user.service';
import { SmsService } from '../common/sms.service';
import { PhoneLoginDto } from './dto/phone-login.dto';
import { TemporaryPasswordService } from './temporary-password.service';
import { ITemporaryPassword } from './schemas/temporary-password.schema';
import { User } from 'src/graphql.schema';
import * as jwt from 'jsonwebtoken';

export class JWTAuth {
  id: string;
}
@Injectable()
export class AuthService {
  private readonly logger: Logger = new Logger(AuthService.name);

  private cert: string = `N33cSq4Ne6F6j4A9`;

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

  generateUserWithAccessToken(user: IUser): User {
    const id = user.id || user._id;
    const accessToken = this.encode({ id });
    return { ...user, accessToken };
  }

  public encode(jwtAuth: JWTAuth): string {
    const token = jwt.sign(jwtAuth, this.cert);

    return token;
  }

  public decode(token: string): JWTAuth {
    const data: JWTAuth = jwt.verify(token, this.cert) as JWTAuth;

    return data;
  }
}
