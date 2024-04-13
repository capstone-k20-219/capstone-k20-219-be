import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsArray, IsEmail, IsString, IsDate, IsEnum } from 'class-validator';
import { UserRoleEnum } from '../enums/user-role.enum';

export class GetUserRequestDto {
  @ApiProperty()
  @IsString()
  _id?: string;

  @ApiProperty()
  @IsEmail()
  email?: string;

  @ApiProperty()
  @IsEnum(UserRoleEnum, { each: true })
  role: UserRoleEnum;
}

export class CreateUserRequestDto {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  password: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsDate()
  dob: Date;

  @ApiProperty()
  @IsString()
  phone: string;

  @ApiProperty()
  @IsString()
  image: string;

  @ApiProperty()
  @IsArray()
  bank_account: BankAccountDto[];

  @ApiProperty()
  @IsArray()
  @IsEnum(UserRoleEnum, { each: true })
  role: UserRoleEnum[];
}

export class BankAccountDto {
  @ApiProperty()
  @IsString()
  account_no: string;

  @ApiProperty()
  @IsString()
  bank: string;
}

export class UpdateUserRequestDto extends PartialType(CreateUserRequestDto) {}
