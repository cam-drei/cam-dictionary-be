import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { User } from '../graphql.schema';
import { SocialLoginDto } from './dto/social-login.dto';
import { SendPasswordToPhoneDto } from './dto/send-password-to-phone.dto';
import { PhoneLoginDto } from './dto/phone-login.dto';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { TemporaryPasswordService } from './temporary-password.service';
import { USER_PROVIDER } from 'src/user/schemas/user.schema';

@Resolver('Auth')
export class AuthResolvers {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
    private readonly temporaryPasswordService: TemporaryPasswordService,
  ) {}

  @Mutation('loginByFacebook')
  async loginByFacebook(@Args('params') args: SocialLoginDto): Promise<User> {
    args.provider = USER_PROVIDER.FACEBOOK;

    let user = await this.userService.getProfileBySocial(args);
    if (!user) {
      user = await this.userService.createSocialProfile(args);
    }
    return user;
  }

  @Mutation('loginByGoogle')
  async loginByGoogle(@Args('params') args: SocialLoginDto): Promise<User> {
    args.provider = USER_PROVIDER.GOOGLE;
    let user = await this.userService.getProfileBySocial(args);
    if (!user) {
      user = await this.userService.createSocialProfile(args);
    }
    return user;
  }

  @Mutation('sendPasswordToPhone')
  async sendPasswordToPhone(
    @Args('params') params: SendPasswordToPhoneDto,
  ): Promise<User> {
    params.provider = USER_PROVIDER.PHONE;
    let user = await this.userService.getProfileByPhone(params.phone);
    if (!user) {
      user = await this.userService.createPhoneProfile(params);
    }
    await this.temporaryPasswordService.generateTemporaryPassword(user);
    return user;
  }

  @Mutation('loginByPhone')
  async loginByPhone(@Args('params') params: PhoneLoginDto): Promise<User> {
    const user = await this.authService.loginByPhone(params);
    return user;
  }
}
