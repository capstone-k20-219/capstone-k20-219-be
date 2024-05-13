import { UserRoleEnum } from '../../users/enums/user-role.enum';
export declare class SignInDto {
    email: string;
    password: string;
}
export declare class CheckPermissionDto {
    role: UserRoleEnum[];
}
export declare class RefreshTokenRequestDto {
    refresh_token: string;
}
export declare class LogOutDto extends RefreshTokenRequestDto {
}
