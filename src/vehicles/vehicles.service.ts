import { Injectable } from '@nestjs/common';
import { BaseService } from '../shared/services/base.service';
import { Vehicle } from './entities/vehicle.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class VehiclesService extends BaseService<Vehicle> {
  constructor(
    @InjectRepository(Vehicle)
    private readonly _vehicleRepo: Repository<Vehicle>,
  ) {
    super(_vehicleRepo, 'vehicle');
  }
}
