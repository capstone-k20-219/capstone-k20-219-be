import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseService } from '../shared/services/base.service';
import { VehicleTypeEntity } from './entities/vehicle-type.entity';

@Injectable()
export class VehicleTypesService extends BaseService<VehicleTypeEntity> {
  constructor(
    @InjectModel(VehicleTypeEntity.name)
    private readonly vehicleTypeEntity: Model<VehicleTypeEntity>,
  ) {
    super(vehicleTypeEntity);
  }
}
