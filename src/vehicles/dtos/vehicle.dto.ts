import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsInt, IsNumber, IsOptional, IsString, Length } from 'class-validator';

export class GetVehicleRequestDto {
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  id?: number;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  userId?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  typeId?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  plateNo?: string;
}

export class CreateVehicleRequestDto {
  @ApiProperty()
  @IsString()
  plateNo: string;

  @ApiProperty()
  @IsString()
  @Length(3, 3)
  typeId: string;

  @ApiProperty({ required: false })
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
