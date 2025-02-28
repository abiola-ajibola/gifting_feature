/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Type } from 'class-transformer';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { Property } from 'src/property/entities/property.entity';
import { User } from 'src/user/entities/user.entity';

export class CreateGiftDto {
  @Type(() => User)
  giver: User;

  @Type(() => User)
  receiver: User;

  @Type(() => Property)
  property: Property;

  accepted?: boolean;

  @IsNotEmpty()
  giverId: number;

  @IsEmail()
  @IsNotEmpty()
  receiverEmail: string;

  @IsNotEmpty()
  propertyId: number;
}
