import { Logger } from '@nestjs/common';
import { CreateUserRequestDto, GetUserRequestDto, UpdateUserRequestDto } from './dtos/user.request.dto';
import { UsersService } from './user.service';
import { Response } from 'express';
export declare class UserController {
    private readonly userService;
    logger: Logger;
    private readonly salt;
    constructor(userService: UsersService);
    create(user: CreateUserRequestDto, res: Response): Promise<Response<any, Record<string, any>>>;
    find(request: Request, res: Response): Promise<void>;
    findAll(res: Response): Promise<void>;
    findByQuery(filter: GetUserRequestDto, res: Response): Promise<void>;
    update(request: Request, updateUserDto: UpdateUserRequestDto, res: Response): Promise<void>;
    updateForManager(id: string, updateUserDto: UpdateUserRequestDto, res: Response): Promise<void>;
    delete(request: Request, res: Response): Promise<void>;
    deleteForManager(id: string, res: Response): Promise<void>;
}
