import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/shared/services/base.service';
import { SlotBookingEntity } from './entities/slot-booking.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class SlotBookingsService extends BaseService<SlotBookingEntity> {
  constructor(
    @InjectModel(SlotBookingEntity.name)
    slotBookingModel: Model<SlotBookingEntity>,
  ) {
    super(slotBookingModel);
  }
}
