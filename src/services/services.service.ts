import { Injectable } from '@nestjs/common';
import { BaseService } from '../shared/services/base.service';
import { Service } from './entities/service.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ServicesService extends BaseService<Service> {
  constructor(
    @InjectRepository(Service)
    private readonly _serviceRepo: Repository<Service>,
  ) {
    super(_serviceRepo, 'service');
  }
}
