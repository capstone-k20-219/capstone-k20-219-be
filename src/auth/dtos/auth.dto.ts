import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
} from 'class-validator';
import { UserRoleEnum } from '../../users/enums/user-role.enum';

export class SignInDto {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password: string;
}

export class CheckPermissionDto {
  @ApiProperty()
  @IsArray()
  @IsEnum(UserRoleEnum, { each: true })
  role: UserRoleEnum[];
}

export class RefreshTokenRequestDto {
  @ApiProperty()
  @IsString()
  refresh_token: string;
}

export class LogOutDto extends RefreshTokenRequestDto {}
