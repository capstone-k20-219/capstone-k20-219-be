import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/shared/services/base.service';
import { ParkingHistoryEntity } from './entities/parking-history.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ParkingHistoryService extends BaseService<ParkingHistoryEntity> {
  constructor(
    @InjectModel(ParkingHistoryEntity.name)
    parkingHistoryModel: Model<ParkingHistoryEntity>,
  ) {
    super(parkingHistoryModel);
  }
}
