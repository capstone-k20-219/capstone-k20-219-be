import { Module } from '@nestjs/common';
import { ParkingHistoryService } from './parking-history.service';
import { ParkingHistoryController } from './parking-history.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  ParkingHistoryEntity,
  ParkingHistorySchema,
} from './entities/parking-history.entity';

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
