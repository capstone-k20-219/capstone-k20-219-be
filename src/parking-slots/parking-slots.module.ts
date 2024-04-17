import { Module } from '@nestjs/common';
import { ParkingSlotsService } from './parking-slots.service';
import { ParkingSlotsController } from './parking-slots.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  ParkingSlotEntity,
  ParkingSlotSchema,
} from './entities/parking-slot.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ParkingSlotEntity.name, schema: ParkingSlotSchema },
    ]),
  ],
  controllers: [ParkingSlotsController],
  providers: [ParkingSlotsService],
})
export class ParkingSlotsModule {}
