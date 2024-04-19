import { ApiProperty } from '@nestjs/swagger';

export class GetParkingHistoryDto {}

export class CreateParkingHistoryDto {
  @ApiProperty()
  slot_id: string;

  @ApiProperty()
  vehicle_id: string;
}

export class UpdateParkingHistoryDto {
  @ApiProperty()
  _id: string;

  @ApiProperty()
  bill_id: string;
}
