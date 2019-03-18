import { SendPasswordToPhoneInput } from '../../graphql.schema';
import { IsNotEmpty, IsPhoneNumber } from 'class-validator';
import { USER_PROVIDER } from 'src/user/schemas/user.schema';

export class SendPasswordToPhoneDto extends SendPasswordToPhoneInput {
  @IsNotEmpty()
  @IsPhoneNumber('US')
  readonly phone: string;

  provider: USER_PROVIDER;
}
