import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from '../users/entities/user.entity';
import { UserService } from '../users/user.service';
import { JwtPayload } from './auth.interface';
import { SignInDto } from './dtos/sign-in.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(_id: string): Promise<UserEntity> {
    const user = await this.usersService.findOne({ _id: _id });
    return user ?? null;
  }

  async generateJWT(_id: string): Promise<{ access_token: string }> {
    const user = await this.validateUser(_id);
    if (!user) {
      throw new UnauthorizedException('NotFoundUser');
    }
    const payload = {
      _id: user._id,
      email: user.email,
      name: user.name,
      roles: user.role,
    };
    return this._generateJWT(payload);
  }

  async signIn(email: string, password: string) {
    const user = await this.usersService.findOne({
      email: { $regex: email },
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const payload = {
        _id: user._id,
        email: user.email,
        name: user.name,
        roles: user.role,
      };
      const res = this._generateJWT(payload);
      return { ...res, _id: user._id };
    } else {
      throw new UnauthorizedException();
    }
  }

  private _generateJWT(payload: JwtPayload): { access_token: string } {
    console.log(`Generated JWT token with payload ${JSON.stringify(payload)}`);

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
