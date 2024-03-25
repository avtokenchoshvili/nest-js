import { IsEmail } from 'class-validator';
import { IsNotEmpty } from 'class-validator/types/decorator/common/IsNotEmpty';

export class SignInDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
