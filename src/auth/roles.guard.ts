import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtPayload } from './auth.interface';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.getAllAndOverride<string[]>('roles', [
      context.getHandler(), // Method Roles
      context.getClass(), // Controller Roles
    ]);

    if (!roles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();

    const user = request.user as JwtPayload;
    if (!user || !user.roles) {
      return false;
    }

    if (!user.roles) {
      return false;
    }

    return user.roles.some((role: string) => roles.includes(role));
  }
}
