import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, Length } from 'class-validator';

export class GetVehicleRequestDto {}

export class CreateVehicleRequestDto {
  @ApiProperty()
  @IsString()
  plateNo: string;

  @ApiProperty()
  @IsString()
  @Length(3, 3)
  typeId: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  description?: string;
}

export class UpdateVehicleRequestDto extends PartialType(
  CreateVehicleRequestDto,
) {
  @ApiProperty()
  @IsInt()
  id: number;
}
