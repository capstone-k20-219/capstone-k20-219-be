import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, Length } from 'class-validator';

export class CreateParkingSlotDto {
  @ApiProperty()
  @IsString()
  @Length(1, 10)
  id: string;

  @ApiProperty()
  @Length(3, 3)
  typeId: string;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  x_start?: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  x_end?: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  y_start?: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  y_end?: number;
}

export class GetParkingSlotDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  id?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  typeId?: string;
}

export class UpdateParkingSlotDto extends PartialType(CreateParkingSlotDto) {}
