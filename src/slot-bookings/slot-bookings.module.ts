import { forwardRef, Module } from '@nestjs/common';
import { SlotBookingsService } from './slot-bookings.service';
import { SlotBookingsController } from './slot-bookings.controller';
import { SlotBooking } from './entities/slot-booking.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehiclesModule } from 'src/vehicles/vehicles.module';
import { ParkingSlotsModule } from 'src/parking-slots/parking-slots.module';
import { ParkingTicketsModule } from 'src/parking-tickets/parking-tickets.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([SlotBooking]),
    VehiclesModule,
    ParkingSlotsModule,
    forwardRef(() => ParkingTicketsModule),
  ],
  controllers: [SlotBookingsController],
  providers: [SlotBookingsService],
  exports: [SlotBookingsService],
})
export class SlotBookingsModule {}
