import { ApiProperty } from '@nestjs/swagger';
import { IsInt, Max, Min } from 'class-validator';

export class GetCommentDto {}

export class CreateCommentDto {
  @ApiProperty()
  serviceId: string;

  @ApiProperty()
  content: string;

  @ApiProperty()
  @IsInt()
  @Min(0)
  @Max(5)
  rating: number;
}
