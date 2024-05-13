import { BaseService } from '../shared/services/base.service';
import { VehicleType } from './entities/vehicle-type.entity';
import { Repository } from 'typeorm';
export declare class VehicleTypesService extends BaseService<VehicleType> {
    private readonly _vehicleTypeRepo;
    constructor(_vehicleTypeRepo: Repository<VehicleType>);
}
