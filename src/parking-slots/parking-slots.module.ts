import { Module } from '@nestjs/common';
import { ParkingSlotsService } from './parking-slots.service';
import { ParkingSlotsController } from './parking-slots.controller';

@Module({
  controllers: [ParkingSlotsController],
  providers: [ParkingSlotsService],
})
export class ParkingSlotsModule {}
