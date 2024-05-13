import { BaseEntity } from 'typeorm';
import { Base } from '../../shared/entities/base.entity';
import { UserRoleEnum } from '../enums/user-role.enum';
import { Vehicle } from '../../vehicles/entities/vehicle.entity';
import { Comment } from '../../comments/entities/comment.entity';
import { ParkingTicket } from '../../parking-tickets/entities/parking-ticket.entity';
import { UserRefreshToken } from '../../auth/entities/user-refresh-token.entity';
export declare class User extends Base {
    id: string;
    email: string;
    password: string;
    name: string;
    dob: Date;
    phone: string;
    image: string;
    bankAccount: BankAccount[];
    role: UserRole[];
    vehicles: Vehicle[];
    comments: Comment[];
    tickets: ParkingTicket[];
    tokens: UserRefreshToken[];
}
export declare class BankAccount extends BaseEntity {
    id: number;
    accountNo: string;
    bank: string;
    user: User;
}
export declare class UserRole extends BaseEntity {
    id: number;
    role: UserRoleEnum;
    user: User;
}
