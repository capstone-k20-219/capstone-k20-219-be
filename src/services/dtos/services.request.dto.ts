import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class GetServiceDto {
  @ApiProperty()
  @IsOptional()
  id?: string;

  @ApiProperty()
  @IsOptional()
  typeId?: string;
}

export class CreateServiceDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsArray()
  prices: ServicePriceDto[];
}

export class ServicePriceDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  typeId: string;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  unitPrice: number;
}

export class UpdateServiceDto extends PartialType(CreateServiceDto) {
  @ApiProperty()
  @IsString()
  id: string;
}
