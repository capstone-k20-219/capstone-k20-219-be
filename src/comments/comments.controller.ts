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
import { Comment } from './entities/comment.entity';
import { idGenerator } from 'src/shared/helpers/idGenerator';

@Controller('comments')
@ApiTags('Comments')
@UseGuards(AuthGuard)
export class CommentsController {
  logger: Logger;
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  async create(@Req() request: Request, @Body() comment: CreateCommentDto) {
    const { id: userId } = request['user'];
    const latest = await this.commentsService.find({
      skip: 0,
      take: 0,
      order: { createdAt: 'DESC' },
    });
    let number = 1;
    if (latest.length) number = Number(latest[0].id.substring(2)) + 1;
    const newComment = {
      id: idGenerator(20, number, 'CM'),
      userId,
      ...comment,
    };
    return await this.commentsService.create(newComment);
  }

  @Get('/service/:id')
  async getByService(@Param('id') serviceId: string): Promise<Comment[]> {
    return await this.commentsService.find({
      select: {
        createdAt: true,
        id: true,
        content: true,
        rating: true,
        user: { id: true, name: true, image: true },
      },
      where: { serviceId: serviceId },
      relations: { user: true },
    });
  }

  @Delete(':id')
  async deleteUserComment(@Req() request: Request, @Param('id') id: string) {
    const user = request['user'];
    const comment = await this.commentsService.getById(id);
    if (!comment) {
      throw new BadRequestException('comment_not_exist');
    }
    if (!user.roles.includes('manager') && comment.userId != user.id) {
      throw new UnauthorizedException();
    }
    const result = await this.commentsService.remove(id);
    return result;
  }
}
