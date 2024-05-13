import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/user.service';
import { UserRoleEnum } from '../users/enums/user-role.enum';
import { UserRefreshTokensService } from './user-refresh-token.service';
export declare class AuthService {
    private usersService;
    private jwtService;
    private readonly userRefreshTokensService;
    constructor(usersService: UsersService, jwtService: JwtService, userRefreshTokensService: UserRefreshTokensService);
    signIn(email: string, password: string): Promise<{
        id: string;
        refresh_token: string;
        access_token: string;
    } | {
        id: string;
        access_token: string;
        refresh_token?: undefined;
    }>;
    checkPermission(userRoles: UserRoleEnum[], checkRoles: UserRoleEnum[]): Boolean;
    refresh(refreshToken: string): Promise<{
        refresh_token: string;
        access_token: string;
    } | {
        access_token: string;
        refresh_token?: undefined;
    }>;
    logOut(userId: string, all: boolean, refreshToken?: string): Promise<boolean>;
    private _generateJWT;
    private reserve;
    private verifyRefresh;
}
