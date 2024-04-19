import { Module } from '@nestjs/common';
import { SlotBookingsService } from './slot-bookings.service';
import { SlotBookingsController } from './slot-bookings.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  SlotBookingEntity,
  SlotBookingSchema,
} from './entities/slot-booking.entity';
import { ParkingHistoryModule } from 'src/parking-history/parking-history.module';
import { VehiclesModule } from 'src/vehicles/vehicles.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SlotBookingEntity.name, schema: SlotBookingSchema },
    ]),
    ParkingHistoryModule,
    VehiclesModule,
  ],
  controllers: [SlotBookingsController],
  providers: [SlotBookingsService],
})
export class SlotBookingsModule {}
