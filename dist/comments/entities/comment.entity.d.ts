import { Base } from '../../shared/entities/base.entity';
import { User } from '../../users/entities/user.entity';
import { Service } from '../../services/entities/service.entity';
export declare class Comment extends Base {
    id: string;
    userId: string;
    serviceId: string;
    content: string;
    rating: number;
    user: User;
    service: Service;
}
