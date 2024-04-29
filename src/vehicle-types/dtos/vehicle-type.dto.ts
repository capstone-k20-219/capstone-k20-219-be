import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, Length } from 'class-validator';

export class GetVehicleTypeRequestDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  id?: string;
}

export class CreateVehicleTypeRequestDto {
  @ApiProperty()
  @IsString()
  @Length(3, 3)
  id: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  parkingFee?: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  slotBookingFee?: number;
}

export class UpdateVehicleTypeRequestDto extends PartialType(
  CreateVehicleTypeRequestDto,
) {}
