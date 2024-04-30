import { Injectable } from '@nestjs/common';
import { BaseService } from '../shared/services/base.service';
import { UserRefreshToken } from './entities/user-refresh-token.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserRefreshTokensService extends BaseService<UserRefreshToken> {
  constructor(
    @InjectRepository(UserRefreshToken)
    private readonly _userRefreshTokenRepo: Repository<UserRefreshToken>,
  ) {
    super(_userRefreshTokenRepo, 'user_refresh_token');
  }
}
