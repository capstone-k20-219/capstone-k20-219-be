import { ApiProperty, PartialType } from '@nestjs/swagger';

export class GetVehicleRequestDto {}

export class CreateVehicleRequestDto {
  @ApiProperty()
  user_id: string;

  @ApiProperty()
  plate_no: string;

  @ApiProperty()
  type_code: string;
}

export class UpdateVehicleRequestDto extends PartialType(
  CreateVehicleRequestDto,
) {}
