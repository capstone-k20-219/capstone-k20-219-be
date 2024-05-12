import { BaseService } from '../shared/services/base.service';
import { UserRefreshToken } from './entities/user-refresh-token.entity';
import { Repository } from 'typeorm';
export declare class UserRefreshTokensService extends BaseService<UserRefreshToken> {
    private readonly _userRefreshTokenRepo;
    constructor(_userRefreshTokenRepo: Repository<UserRefreshToken>);
}
