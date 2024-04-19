import { Module } from '@nestjs/common';
import { ParkingHistoryService } from './parking-history.service';
import { ParkingHistoryController } from './parking-history.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  ParkingHistoryEntity,
  ParkingHistorySchema,
} from './entities/parking-history.entity';
import { SlotBookingsModule } from 'src/slot-bookings/slot-bookings.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ParkingHistoryEntity.name, schema: ParkingHistorySchema },
    ]),
  ],
  controllers: [ParkingHistoryController],
  providers: [ParkingHistoryService],
  exports: [ParkingHistoryService],
})
export class ParkingHistoryModule {}
