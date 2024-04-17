import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/shared/services/base.service';
import { ServiceEntity } from './entities/service.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ServicesService extends BaseService<ServiceEntity> {
  constructor(
    @InjectModel(ServiceEntity.name)
    private readonly serviceModel: Model<ServiceEntity>,
  ) {
    super(serviceModel);
  }
}
