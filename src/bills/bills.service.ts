import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/shared/services/base.service';
import { BillEntity } from './entities/bill.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class BillsService extends BaseService<BillEntity> {
  constructor(@InjectModel(BillEntity.name) billModel: Model<BillEntity>) {
    super(billModel);
  }
}
