import { BaseService } from '../shared/services/base.service';
import { Service } from './entities/service.entity';
import { Repository } from 'typeorm';
export declare class ServicesService extends BaseService<Service> {
    private readonly _serviceRepo;
    constructor(_serviceRepo: Repository<Service>);
}
