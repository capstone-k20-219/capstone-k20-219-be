import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class CreateServiceBookingDto {
  @ApiProperty()
  @IsString()
  ticketId: string;

  @ApiProperty()
  @IsString()
  serviceId: string;
}

export class UpdateServiceBookingDto {
  @ApiProperty()
  @IsNumber()
  id: number;

  @ApiProperty()
  @IsNumber()
  quantity: number;

  @ApiProperty()
  @IsBoolean()
  isDone: boolean;
}

export class GetServiceBookingDto {}
