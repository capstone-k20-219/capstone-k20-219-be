import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsOptional, IsString } from 'class-validator';

export class GetParkingTicketDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  serviceId?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  fromDate?: Date;

  @ApiProperty({ required: false })
  @IsOptional()
  toDate?: Date;
}

export class CreateParkingTicketDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  slotId?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  userId?: string;

  @ApiProperty({ required: false })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty()
  @IsString()
  plateNo: string;
}

export class CheckOutDto {
  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsString()
  plateNo: string;

  @ApiProperty({ required: false })
  @IsEmail()
  @IsOptional()
  email?: string;
}

export class UpdateTicketPaidStatusDto {
  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsBoolean()
  isPaid: boolean;
}
