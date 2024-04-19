import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class CreateServiceBookingDto {
  @ApiProperty()
  parking_ticket_id: string;

  @ApiProperty()
  service_id: string;
}

export class UpdateServiceBookingDto {
  @ApiProperty()
  @IsNumber()
  quantity: number;
}

export class GetServiceBookingDto {}
