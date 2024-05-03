import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsArray,
  IsEmail,
  IsString,
  IsDate,
  IsEnum,
  IsOptional,
} from 'class-validator';
import { UserRoleEnum } from '../enums/user-role.enum';

export class GetUserRequestDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  id?: string;

  @ApiProperty({ required: false })
  @IsEnum(UserRoleEnum, { each: true })
  @IsOptional()
  role?: string;
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
  // @IsDate()
  dob: Date;

  @ApiProperty()
  @IsString()
  phone: string;

  @ApiProperty()
  @IsString()
  image: string;

  @ApiProperty()
  @IsArray()
  bankAccount: BankAccountDto[];

  @ApiProperty()
  @IsArray()
  @IsEnum(UserRoleEnum, { each: true })
  role: UserRoleEnum[];
}

export class BankAccountDto {
  @ApiProperty()
  @IsString()
  accountNo: string;

  @ApiProperty()
  @IsString()
  bank: string;
}

export class UpdateUserRequestDto extends PartialType(CreateUserRequestDto) {
  id: string;
}
