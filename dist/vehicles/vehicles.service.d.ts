import { BaseService } from '../shared/services/base.service';
import { Vehicle } from './entities/vehicle.entity';
import { Repository } from 'typeorm';
export declare class VehiclesService extends BaseService<Vehicle> {
    private readonly _vehicleRepo;
    constructor(_vehicleRepo: Repository<Vehicle>);
}
