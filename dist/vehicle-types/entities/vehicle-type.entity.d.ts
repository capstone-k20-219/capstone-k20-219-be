import { Base } from '../../shared/entities/base.entity';
import { Vehicle } from '../../vehicles/entities/vehicle.entity';
import { ParkingSlot } from '../../parking-slots/entities/parking-slot.entity';
import { ServicePrice } from '../../services/entities/service.entity';
export declare class VehicleType extends Base {
    id: string;
    name: string;
    parkingFee: number;
    slotBookingFee: number;
    vehicles: Vehicle[];
    slots: ParkingSlot[];
    prices: ServicePrice[];
}
