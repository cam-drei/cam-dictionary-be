import { SendPasswordToPhoneInput } from '../../graphql.schema';
import { IsNotEmpty, IsPhoneNumber } from 'class-validator';
import { Provider } from '../../common/enums/provider.enum';

export class SendPasswordToPhoneDto extends SendPasswordToPhoneInput {
  @IsNotEmpty()
  @IsPhoneNumber('US')
  readonly phone: string;

  provider: Provider;
}
