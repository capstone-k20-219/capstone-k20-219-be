import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseService } from 'src/shared/services/base.service';
import { CommentEntity } from './entities/comment.entity';

@Injectable()
export class CommentsService extends BaseService<CommentEntity> {
  constructor(
    @InjectModel(CommentEntity.name)
    private readonly commentModel: Model<CommentEntity>,
  ) {
    super(commentModel);
  }
}
