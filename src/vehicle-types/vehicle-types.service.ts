import { Injectable } from '@nestjs/common';
import { BaseService } from '../shared/services/base.service';
import { VehicleType } from './entities/vehicle-type.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class VehicleTypesService extends BaseService<VehicleType> {
  constructor(
    @InjectRepository(VehicleType)
    private readonly _vehicleTypeRepo: Repository<VehicleType>,
  ) {
    super(_vehicleTypeRepo, 'vehicle_type');
  }
}
