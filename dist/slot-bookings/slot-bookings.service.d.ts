import { BaseService } from '../shared/services/base.service';
import { SlotBooking } from './entities/slot-booking.entity';
import { Repository } from 'typeorm';
export declare class SlotBookingsService extends BaseService<SlotBooking> {
    private readonly _slotBookingRepo;
    constructor(_slotBookingRepo: Repository<SlotBooking>);
}
