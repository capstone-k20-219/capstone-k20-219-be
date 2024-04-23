import { Injectable } from '@nestjs/common';
import { BaseService } from '../shared/services/base.service';
import { Comment } from './entities/comment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CommentsService extends BaseService<Comment> {
  constructor(
    @InjectRepository(Comment)
    private readonly _commentRepo: Repository<Comment>,
  ) {
    super(_commentRepo, 'comment');
  }
}
