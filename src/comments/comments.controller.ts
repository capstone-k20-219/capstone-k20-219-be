import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateCommentDto } from './dtos/comments.dto';
import { CommentEntity } from './entities/comment.entity';

@Controller('comments')
@ApiTags('Comments')
@UseGuards(AuthGuard)
export class CommentsController {
  logger: Logger;
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  async create(@Req() request: Request, @Body() comment: CreateCommentDto) {
    const user_id = request['user']._id;
    const newComment = {
      ...comment,
      user_id: user_id,
    } as CommentEntity;
    return await this.commentsService.create(newComment);
  }

  @Get('/service/:id')
  async getByService(
    @Param('id') service_id: string,
  ): Promise<CommentEntity[]> {
    return await this.commentsService.find({ service_id: service_id });
  }

  @Delete(':_id')
  async deleteUserComment(@Req() request: Request, @Param('_id') _id: string) {
    const user = request['user'];
    const comment = await this.commentsService.findOne({ _id: _id });
    if (!comment) {
      throw new BadRequestException('comment_not_exist');
    }
    if (!user.role.includes('manager') && comment.user_id != user._id) {
      throw new UnauthorizedException();
    }
    const result = await this.commentsService.removeByConditions({ _id: _id });
    return result;
  }
}
