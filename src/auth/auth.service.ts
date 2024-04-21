import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/user.service';
import { JwtPayload } from './auth.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(id: string): Promise<User> {
    const user = await this.usersService.getById(id);
    return user ?? null;
  }

  async generateJWT(id: string): Promise<{ access_token: string }> {
    const user = await this.validateUser(id);
    if (!user) {
      throw new UnauthorizedException('NotFoundUser');
    }
    const payload = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    };
    return this._generateJWT(payload);
  }

  async signIn(email: string, password: string) {
    const user = await this.usersService.findOne({
      where: { email: email },
      relations: { role: true },
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    console.log(JSON.stringify(user));

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const payload = {
        id: user.id,
        email: user.email,
        name: user.name,
        roles: user.role.map((item) => item.role),
      };
      console.log(JSON.stringify(payload));
      const res = this._generateJWT(payload);
      return { ...res, id: user.id };
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
