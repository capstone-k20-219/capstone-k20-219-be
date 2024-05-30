import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class PaymentInfoDto {
  @ApiProperty()
  @IsNumber()
  amount: number;
}
