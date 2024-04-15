import { ApiProperty } from '@nestjs/swagger';

export class GetCommentDto {}

export class CreateCommentDto {
  @ApiProperty()
  service_code: string;

  @ApiProperty()
  content: string;
}
