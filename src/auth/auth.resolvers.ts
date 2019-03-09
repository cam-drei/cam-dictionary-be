import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { User } from '../graphql.schema';
import { SocialLoginDto } from './dto/social-login.dto';
import { SendPasswordToPhoneDto } from './dto/send-password-to-phone.dto';
import { PhoneLoginDto } from './dto/phone-login.dto';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { Provider } from '../common/enums/provider.enum';
import { TemporaryPasswordService } from './temporary-password.service';

@Resolver('Auth')
export class AuthResolvers {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
    private readonly temporaryPasswordService: TemporaryPasswordService,
  ) {}

  @Mutation('loginByFacebook')
  async loginByFacebook(@Args('params') args: SocialLoginDto): Promise<User> {
    args.provider = Provider.Facebook;
    return await this.userService.getOrCreateBySocialProfile(args);
  }

  @Mutation('loginByGoogle')
  async loginByGoogle(@Args('params') args: SocialLoginDto): Promise<User> {
    args.provider = Provider.Google;
    return await this.userService.getOrCreateBySocialProfile(args);
  }

  @Mutation('sendPasswordToPhone')
  async sendPasswordToPhone(
    @Args('params') params: SendPasswordToPhoneDto,
  ): Promise<User> {
    params.provider = Provider.Phone;
    const user = await this.userService.getOrCreateByPhone(params);

    await this.temporaryPasswordService.generateTemporaryPassword(user);
    return user;
  }

  @Mutation('loginByPhone')
  async loginByPhone(@Args('params') params: PhoneLoginDto): Promise<User> {
    return await this.authService.loginByPhone(params);
  }
}
