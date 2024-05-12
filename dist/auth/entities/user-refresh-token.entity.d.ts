import { Base } from '../../shared/entities/base.entity';
import { User } from '../../users/entities/user.entity';
export declare class UserRefreshToken extends Base {
    id: number;
    userId: string;
    refreshToken: string;
    user: User;
}
