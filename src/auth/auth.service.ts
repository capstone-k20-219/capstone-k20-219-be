import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/user.service';
import { JwtPayload } from './auth.interface';
import * as bcrypt from 'bcrypt';
import { UserRoleEnum } from 'src/users/enums/user-role.enum';
import { UserRefreshTokensService } from './user-refresh-token.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private readonly userRefreshTokensService: UserRefreshTokensService,
  ) {}

  async signIn(email: string, password: string) {
    const user = await this.usersService.findOne({
      where: { email: email },
      relations: { role: true },
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const payload = {
        id: user.id,
        email: user.email,
        name: user.name,
        roles: user.role.map((item) => item.role),
      };
      console.log(JSON.stringify(payload));
      const tokens = await this._generateJWT(payload, true);
      return { ...tokens, id: user.id };
    } else {
      throw new UnauthorizedException();
    }
  }

  checkPermission(
    userRoles: UserRoleEnum[],
    checkRoles: UserRoleEnum[],
  ): Boolean {
    let result = false;
    for (const role of checkRoles) {
      if (userRoles.includes(role)) {
        result = true;
        break;
      }
    }
    return result;
  }

  async refresh(refreshToken: string) {
    try {
      const payload = await this.jwtService.verify(refreshToken, {
        secret: process.env.JWT_REFRESH_SECRET,
      });
      const isRefreshVerified = await this.verifyRefresh(
        payload.id,
        refreshToken,
      );
      if (!isRefreshVerified) throw new UnauthorizedException();
      const refreshPayload = {
        id: payload.id,
        email: payload.email,
        name: payload.name,
        roles: payload.roles,
      };
      const token = await this._generateJWT(refreshPayload);
      return { ...token };
    } catch (err) {
      throw new UnauthorizedException('Invalid token');
    }
  }

  async logOut(userId: string, all: boolean, refreshToken: string = null) {
    try {
      if (!all) {
        const tokenList = await this.userRefreshTokensService.find({
          where: { userId },
        });
        let refreshId = -1;
        for (const token of tokenList) {
          const isEqual = await bcrypt.compare(
            this.reserve(refreshToken),
            token.refreshToken,
          );
          if (isEqual) {
            refreshId = token.id;
            break;
          }
        }
        if (refreshId === -1) throw new ForbiddenException();
        const result = await this.userRefreshTokensService.remove(refreshId);
        return result;
      } else {
        const result = await this.userRefreshTokensService.removeByConditions({
          userId,
        });
        return result;
      }
    } catch (err) {
      throw new ForbiddenException();
    }
  }

  private async _generateJWT(payload: JwtPayload, refresh = false) {
    console.log(`JWT token payload ${JSON.stringify(payload)}`);
    const access_token = this.jwtService.sign(payload);

    if (refresh) {
      const refresh_token = this.jwtService.sign(payload, {
        secret: process.env.JWT_REFRESH_SECRET,
        expiresIn: process.env.JWT_REFRESH_EXPIRED,
      });
      const savedToken = await bcrypt.hash(this.reserve(refresh_token), 10);
      await this.userRefreshTokensService.create({
        userId: payload.id,
        refreshToken: savedToken,
      });
      return { refresh_token, access_token };
    } else {
      return { access_token };
    }
  }

  private reserve(s: string): string {
    return s.split('').reverse().join('');
  }

  private async verifyRefresh(id: string, refreshToken: string) {
    const tokenList = await this.userRefreshTokensService.find({
      where: { userId: id },
    });
    let isVerified = false;

    for (const token of tokenList) {
      const isEqual = await bcrypt.compare(
        this.reserve(refreshToken),
        token.refreshToken,
      );
      if (isEqual) {
        isVerified = true;
        break;
      }
    }

    return isVerified;
  }
}
