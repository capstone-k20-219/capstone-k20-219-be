import { Module } from '@nestjs/common';
import { ServiceBookingsService } from './service-bookings.service';
import { ServiceBookingsController } from './service-bookings.controller';
import { ServiceBooking } from './entities/service-booking.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParkingTicketsModule } from '../parking-tickets/parking-tickets.module';
import { ServicesModule } from '../services/services.module';
import { VehiclesModule } from '../vehicles/vehicles.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ServiceBooking]),
    ParkingTicketsModule,
    ServicesModule,
    VehiclesModule,
  ],
  controllers: [ServiceBookingsController],
  providers: [ServiceBookingsService],
  exports: [ServiceBookingsService],
})
export class ServiceBookingsModule {}
