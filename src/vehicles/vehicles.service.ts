import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseService } from '../shared/services/base.service';
import { VehicleEntity } from './entities/vehicle.entity';

@Injectable()
export class VehiclesService extends BaseService<VehicleEntity> {
  constructor(
    @InjectModel(VehicleEntity.name)
    private readonly vehicleEntity: Model<VehicleEntity>,
  ) {
    super(vehicleEntity);
  }
}
