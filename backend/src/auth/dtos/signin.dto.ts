/* eslint-disable @typescript-eslint/no-unsafe-call */
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class SigninDto {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @IsStrongPassword()
  password: string;
}
