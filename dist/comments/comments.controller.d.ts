import { Logger } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dtos/comments.dto';
import { Response } from 'express';
export declare class CommentsController {
    private readonly commentsService;
    logger: Logger;
    constructor(commentsService: CommentsService);
    create(request: Request, comment: CreateCommentDto, res: Response): Promise<Response<any, Record<string, any>>>;
    getByService(serviceId: string, res: Response): Promise<Response<any, Record<string, any>>>;
    deleteUserComment(request: Request, id: string, res: Response): Promise<Response<any, Record<string, any>>>;
}
