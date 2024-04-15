import { ApiProperty, PartialType } from '@nestjs/swagger';

export class GetParkingSlotRequestDto {
  @ApiProperty()
  code?: string;

  @ApiProperty()
  vehicle_type?: string;
}

export class CreateParkingSlotRequestDto {
  @ApiProperty()
  code: string;

  @ApiProperty()
  vehicle_type: string;

  @ApiProperty()
  coordinate: ParkingSlotCoordinateDto;
}

export class ParkingSlotCoordinateDto {
  @ApiProperty()
  x_start: number;

  @ApiProperty()
  x_end: number;

  @ApiProperty()
  y_start: number;

  @ApiProperty()
  y_end: number;
}

export class UpdateParkingSlotRequestDto extends PartialType(
  CreateParkingSlotRequestDto,
) {}
