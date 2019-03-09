import { PhoneLoginInput } from '../../graphql.schema';
import { IsNotEmpty, IsPhoneNumber } from 'class-validator';

export class PhoneLoginDto extends PhoneLoginInput {
  @IsNotEmpty()
  @IsPhoneNumber('US')
  readonly phone: string;

  @IsNotEmpty()
  readonly password: string;
}
