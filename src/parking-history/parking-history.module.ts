import { Module } from '@nestjs/common';
import { ParkingHistoryService } from './parking-history.service';
import { ParkingHistoryController } from './parking-history.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  ParkingHistoryEntity,
  ParkingHistorySchema,
} from './entities/parking-history.entity';
import { BillsModule } from 'src/bills/bills.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ParkingHistoryEntity.name, schema: ParkingHistorySchema },
    ]),
    BillsModule,
  ],
  controllers: [ParkingHistoryController],
  providers: [ParkingHistoryService],
  exports: [ParkingHistoryService],
})
export class ParkingHistoryModule {}
