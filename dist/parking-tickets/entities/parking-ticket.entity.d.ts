import { Base } from '../../shared/entities/base.entity';
import { ServiceBooking } from '../../service-bookings/entities/service-booking.entity';
import { ParkingSlot } from '../../parking-slots/entities/parking-slot.entity';
import { User } from '../../users/entities/user.entity';
export declare class ParkingTicket extends Base {
    id: string;
    slotId: string;
    plateNo: string;
    userId: string;
    checkOutTime: Date;
    parkingCost: number;
    isPaid: boolean;
    serviceBookings: ServiceBooking[];
    slot: ParkingSlot;
    user: User;
}
