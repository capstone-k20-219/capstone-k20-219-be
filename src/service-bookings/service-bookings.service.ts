import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/shared/services/base.service';
import { ServiceBookingEntity } from './entities/service-booking.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ServiceBookingsService extends BaseService<ServiceBookingEntity> {
  constructor(
    @InjectModel(ServiceBookingEntity.name)
    serviceBookingModel: Model<ServiceBookingEntity>,
  ) {
    super(serviceBookingModel);
  }
}
