import { Module } from '@nestjs/common';
import { ParkingSlotsService } from './parking-slots.service';
import { ParkingSlotsController } from './parking-slots.controller';
import { ParkingSlot } from './entities/parking-slot.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ParkingSlot])],
  controllers: [ParkingSlotsController],
  providers: [ParkingSlotsService],
})
export class ParkingSlotsModule {}
