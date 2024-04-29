import { Injectable } from '@nestjs/common';
import { BaseService } from '../shared/services/base.service';
import { SlotBooking } from './entities/slot-booking.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class SlotBookingsService extends BaseService<SlotBooking> {
  constructor(
    @InjectRepository(SlotBooking)
    private readonly _slotBookingRepo: Repository<SlotBooking>,
  ) {
    super(_slotBookingRepo, 'slot_booking');
  }
}
