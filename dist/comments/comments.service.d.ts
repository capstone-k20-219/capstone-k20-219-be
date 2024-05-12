import { BaseService } from '../shared/services/base.service';
import { Comment } from './entities/comment.entity';
import { Repository } from 'typeorm';
export declare class CommentsService extends BaseService<Comment> {
    private readonly _commentRepo;
    constructor(_commentRepo: Repository<Comment>);
}
