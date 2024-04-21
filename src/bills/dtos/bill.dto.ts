import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty } from 'class-validator';

export class GetBillRequestDto {
  @ApiProperty()
  from?: Date;

  @ApiProperty()
  to?: Date;

  @ApiProperty()
  @IsBoolean()
  is_paid?: boolean;
}

export class CreateBillRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  parking_ticket_id: string;
}
