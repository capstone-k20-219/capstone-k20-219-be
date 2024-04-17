import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class GetServiceRequestDto {
  @ApiProperty()
  code?: string;

  @ApiProperty()
  name?: string;
}

export class CreateServiceRequestDto {
  @ApiProperty()
  @IsString()
  code: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  price: ServicePriceDto[] | number;
}

export class ServicePriceDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  type_code: string;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  price: number;
}

export class UpdateServiceRequestDto extends PartialType(
  CreateServiceRequestDto,
) {}
