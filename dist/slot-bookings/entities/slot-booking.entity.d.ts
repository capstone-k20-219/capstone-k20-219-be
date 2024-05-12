import { Base } from '../../shared/entities/base.entity';
import { ParkingSlot } from '../../parking-slots/entities/parking-slot.entity';
import { Vehicle } from '../../vehicles/entities/vehicle.entity';
export declare class SlotBooking extends Base {
    id: number;
    slotId: string;
    vehicleId: number;
    arrivalTime: Date;
    slot: ParkingSlot;
    vehicle: Vehicle;
}
