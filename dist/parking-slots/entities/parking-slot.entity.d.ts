import { Base } from '../../shared/entities/base.entity';
import { VehicleType } from '../../vehicle-types/entities/vehicle-type.entity';
import { ParkingTicket } from '../../parking-tickets/entities/parking-ticket.entity';
import { SlotBooking } from '../../slot-bookings/entities/slot-booking.entity';
export declare class ParkingSlot extends Base {
    id: string;
    typeId: string;
    x_start: number;
    x_end: number;
    y_start: number;
    y_end: number;
    type: VehicleType;
    tickets: ParkingTicket[];
    bookings: SlotBooking[];
}
