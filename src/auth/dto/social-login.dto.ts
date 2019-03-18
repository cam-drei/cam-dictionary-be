import { SocialLoginInput } from '../../graphql.schema';
import { IsNotEmpty } from 'class-validator';
import { USER_PROVIDER } from 'src/user/schemas/user.schema';

export class SocialLoginDto extends SocialLoginInput {
  readonly phone: string;

  @IsNotEmpty()
  readonly name: string;

  readonly email: string;

  readonly gender: string;
  readonly birthday: string;

  provider: USER_PROVIDER;

  @IsNotEmpty()
  readonly providerUid: string;

  @IsNotEmpty()
  readonly providerAccessToken: string;
}
