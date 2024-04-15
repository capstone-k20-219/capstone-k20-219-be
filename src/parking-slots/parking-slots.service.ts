import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BaseService } from 'src/shared/services/base.service';
import { ParkingSlotEntity } from './entities/parking-slot.entity';
import { Model } from 'mongoose';

@Injectable()
export class ParkingSlotsService extends BaseService<ParkingSlotEntity> {
  constructor(
    @InjectModel(ParkingSlotEntity.name)
    private readonly parkingSlotModel: Model<ParkingSlotEntity>,
  ) {
    super(parkingSlotModel);
  }
}
