import { SocialLoginInput } from '../../graphql.schema';
import { IsNotEmpty } from 'class-validator';
import { Provider } from '../../common/enums/provider.enum';

export class SocialLoginDto extends SocialLoginInput {
  readonly phone: string;

  @IsNotEmpty()
  readonly name: string;

  readonly email: string;

  readonly gender: string;
  readonly birthday: number;

  provider: Provider;

  @IsNotEmpty()
  readonly providerUid: string;

  @IsNotEmpty()
  readonly providerAccessToken: string;
}
