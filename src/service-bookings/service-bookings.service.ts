import { Injectable } from '@nestjs/common';
import { BaseService } from '../shared/services/base.service';
import { ServiceBooking } from './entities/service-booking.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ServiceBookingsService extends BaseService<ServiceBooking> {
  constructor(
    @InjectRepository(ServiceBooking)
    private readonly _serviceBookingRepo: Repository<ServiceBooking>,
  ) {
    super(_serviceBookingRepo, 'service_booking');
  }
}
