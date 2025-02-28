/* eslint-disable @typescript-eslint/no-unsafe-call */
import { PartialType } from '@nestjs/mapped-types';
import { IsEmail, IsString, IsStrongPassword } from 'class-validator';

export class CreateUserDto {
  @IsString()
  readonly username: string;
  @IsString()
  readonly firstname: string;

  @IsString()
  readonly lastname: string;

  @IsEmail()
  readonly email: string;

  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  readonly password: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
