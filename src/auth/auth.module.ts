import { Module } from '@nestjs/common';
import { UserModule } from '../users/user.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserRefreshTokensService } from './user-refresh-token.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRefreshToken } from './entities/user-refresh-token.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserRefreshToken]), UserModule],
  providers: [AuthService, UserRefreshTokensService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
