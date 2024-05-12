import { BaseService } from '../shared/services/base.service';
import { ServiceBooking } from './entities/service-booking.entity';
import { Repository } from 'typeorm';
export declare class ServiceBookingsService extends BaseService<ServiceBooking> {
    private readonly _serviceBookingRepo;
    constructor(_serviceBookingRepo: Repository<ServiceBooking>);
}
