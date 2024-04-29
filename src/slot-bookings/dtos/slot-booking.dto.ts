import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';

export class CreateSlotBookingDto {
  @ApiProperty()
  @IsString()
  slotId: string;

  @ApiProperty()
  @IsInt()
  vehicleId: number;

  @ApiProperty()
  arrivalTime: Date;
}
