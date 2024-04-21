import { Module } from '@nestjs/common';
import { BillsService } from './bills.service';
import { BillsController } from './bills.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { BillEntity, BillSchema } from './entities/bill.entity';
import { ServiceBookingsModule } from 'src/service-bookings/service-bookings.module';
import { ParkingHistoryModule } from 'src/parking-history/parking-history.module';
import { ServicesModule } from 'src/services/services.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: BillEntity.name, schema: BillSchema }]),
    ServiceBookingsModule,
    ParkingHistoryModule,
    ServicesModule,
  ],
  controllers: [BillsController],
  providers: [BillsService],
  exports: [BillsService],
})
export class BillsModule {}
