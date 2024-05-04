import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class CreateParkingSlotDto {
  @ApiProperty()
  @IsString()
  @Length(1, 10)
  id: string;

  @ApiProperty()
  @Length(3, 3)
  typeId: string;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  x_start?: number;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  x_end?: number;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  y_start?: number;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  y_end?: number;
}

export class UpsertParkingSlotDto {
  @ApiProperty()
  @IsArray()
  slots: CreateParkingSlotDto[];
}

export class GetParkingSlotDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  id?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  typeId?: string;
}

export class UpdateParkingSlotDto extends PartialType(CreateParkingSlotDto) {}
