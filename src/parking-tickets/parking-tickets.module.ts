import { forwardRef, Module } from '@nestjs/common';
import { ParkingTicketsService } from './parking-tickets.service';
import { ParkingTicketsController } from './parking-tickets.controller';
import { ParkingTicket } from './entities/parking-ticket.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SlotBookingsModule } from '../slot-bookings/slot-bookings.module';
import { VehicleTypesModule } from '../vehicle-types/vehicle-types.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ParkingTicket]),
    VehicleTypesModule,
    forwardRef(() => SlotBookingsModule),
  ],
  controllers: [ParkingTicketsController],
  providers: [ParkingTicketsService],
  exports: [ParkingTicketsService],
})
export class ParkingTicketsModule {}
