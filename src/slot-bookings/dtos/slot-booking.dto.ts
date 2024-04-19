import { ApiProperty } from '@nestjs/swagger';

export class CreateSlotBookingDto {
  @ApiProperty()
  slot_id: string;

  @ApiProperty()
  vehicle_id: string;

  @ApiProperty()
  arrival_time: Date;
}
