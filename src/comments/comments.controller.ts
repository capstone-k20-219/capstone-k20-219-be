import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';
import { CreateCommentDto } from './dtos/comments.dto';
import { idGenerator } from '../shared/helpers/idGenerator';
import { Response } from 'express';

@Controller('comments')
@ApiTags('Comments')
@UseGuards(AuthGuard)
export class CommentsController {
  logger: Logger;
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  async create(
    @Req() request: Request,
    @Body() comment: CreateCommentDto,
    @Res() res: Response,
  ) {
    try {
      const { id: userId } = request['user'];
      const latest = await this.commentsService.find({
        skip: 0,
        take: 1,
        order: { createdAt: 'DESC' },
      });
      let number = 1;
      if (latest.length) number = Number(latest[0].id.substring(2)) + 1;
      const newComment = {
        id: idGenerator(20, number, 'CM'),
        userId,
        ...comment,
      };
      const result = await this.commentsService.create(newComment);
      return res.status(201).send(result);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  @Get('/service/:id')
  async getByService(@Param('id') serviceId: string, @Res() res: Response) {
    try {
      const result = await this.commentsService.find({
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
      return res.status(200).send(result);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  @Delete(':id')
  async deleteUserComment(
    @Req() request: Request,
    @Param('id') id: string,
    @Res() res: Response,
  ) {
    try {
      const user = request['user'];
      const comment = await this.commentsService.getById(id);
      if (!comment) {
        res.status(400).send('comment_not_exist');
      }
      if (!user.roles.includes('manager') && comment.userId != user.id) {
        res.status(403).send('Forbidden');
      }
      const result = await this.commentsService.remove(id);
      return res.status(200).send(result);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }
}
