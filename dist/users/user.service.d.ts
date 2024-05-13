import { BaseService } from '../shared/services/base.service';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
export declare class UsersService extends BaseService<User> {
    private readonly _userRepo;
    constructor(_userRepo: Repository<User>);
}
