import { ApiProperty, PartialType } from '@nestjs/swagger';

export class GetVehicleTypeRequestDto {}

export class CreateVehicleTypeRequestDto {
  @ApiProperty()
  code: string;

  @ApiProperty()
  type: string;
}

export class UpdateVehicleTypeRequestDto extends PartialType(
  CreateVehicleTypeRequestDto,
) {}
