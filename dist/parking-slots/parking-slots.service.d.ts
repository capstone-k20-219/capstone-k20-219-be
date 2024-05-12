import { BaseService } from '../shared/services/base.service';
import { ParkingSlot } from './entities/parking-slot.entity';
import { Repository } from 'typeorm';
export declare class ParkingSlotsService extends BaseService<ParkingSlot> {
    private readonly _parkingSlotRepo;
    constructor(_parkingSlotRepo: Repository<ParkingSlot>);
    upsert(slots: any): Promise<import("typeorm").InsertResult>;
}
