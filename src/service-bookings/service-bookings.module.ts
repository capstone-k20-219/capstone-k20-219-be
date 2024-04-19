import { Module } from '@nestjs/common';
import { ServiceBookingsService } from './service-bookings.service';
import { ServiceBookingsController } from './service-bookings.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  ServiceBookingEntity,
  ServiceBookingSchema,
} from './entities/service-booking.entity';
import { ParkingHistoryModule } from 'src/parking-history/parking-history.module';
import { VehiclesModule } from 'src/vehicles/vehicles.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ServiceBookingEntity.name, schema: ServiceBookingSchema },
    ]),
    ParkingHistoryModule,
    VehiclesModule,
  ],
  controllers: [ServiceBookingsController],
  providers: [ServiceBookingsService],
})
export class ServiceBookingsModule {}
