import { Module } from '@nestjs/common';
import { VehicleTypesService } from './vehicle-types.service';
import { VehicleType } from './entities/vehicle-type.entity';
import { VehicleTypesController } from './vehicle-types.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([VehicleType])],
  controllers: [VehicleTypesController],
  providers: [VehicleTypesService],
})
export class VehicleTypesModule {}
