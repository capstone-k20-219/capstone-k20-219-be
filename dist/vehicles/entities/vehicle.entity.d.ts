import { Base } from '../../shared/entities/base.entity';
import { User } from '../../users/entities/user.entity';
import { VehicleType } from '../../vehicle-types/entities/vehicle-type.entity';
import { SlotBooking } from '../../slot-bookings/entities/slot-booking.entity';
export declare class Vehicle extends Base {
    id: number;
    plateNo: string;
    description: string;
    typeId: string;
    userId: string;
    user: User;
    type: VehicleType;
    slotBookings: SlotBooking[];
}
