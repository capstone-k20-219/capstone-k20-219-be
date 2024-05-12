import { BaseEntity } from 'typeorm';
import { Base } from '../../shared/entities/base.entity';
import { VehicleType } from '../../vehicle-types/entities/vehicle-type.entity';
import { Comment } from '../../comments/entities/comment.entity';
import { ServiceBooking } from '../../service-bookings/entities/service-booking.entity';
export declare class Service extends Base {
    id: string;
    name: string;
    prices: ServicePrice[];
    comments: Comment[];
    bookings: ServiceBooking[];
}
export declare class ServicePrice extends BaseEntity {
    id: number;
    typeId: string;
    unitPrice: number;
    service: Service;
    type: VehicleType[];
}
