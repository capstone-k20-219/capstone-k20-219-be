import { Injectable } from '@nestjs/common';
import { BaseService } from '../shared/services/base.service';
import { ParkingSlot } from './entities/parking-slot.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ParkingSlotsService extends BaseService<ParkingSlot> {
  constructor(
    @InjectRepository(ParkingSlot)
    private readonly _parkingSlotRepo: Repository<ParkingSlot>,
  ) {
    super(_parkingSlotRepo, 'parking_slot');
  }

  async upsert(slots: any) {
    const upsertObj = await this._parkingSlotRepo.upsert(slots, ['id']);
    return upsertObj;
  }
}
