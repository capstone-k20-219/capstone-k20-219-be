import { AuthService } from './auth.service';
import { CheckPermissionDto, LogOutDto, RefreshTokenRequestDto, SignInDto } from './dtos/auth.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signIn(signInDto: SignInDto): Promise<{
        id: string;
        refresh_token: string;
        access_token: string;
    } | {
        id: string;
        access_token: string;
        refresh_token?: undefined;
    }>;
    checkPermission(req: Request, checkPermissionDto: CheckPermissionDto): Boolean;
    refreshToken(refreshTokenDto: RefreshTokenRequestDto): Promise<{
        access_token: string;
    }>;
    logOut(req: any, logOutDto: LogOutDto): Promise<boolean>;
    logOutAll(req: any): Promise<boolean>;
}
