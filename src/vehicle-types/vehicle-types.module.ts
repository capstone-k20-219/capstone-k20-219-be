import { Module } from '@nestjs/common';
import { VehicleTypesService } from './vehicle-types.service';
import {
  VehicleTypeEntity,
  VehicleTypeSchema,
} from './entities/vehicle-type.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { VehicleTypesController } from './vehicle-types.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: VehicleTypeEntity.name, schema: VehicleTypeSchema },
    ]),
  ],
  controllers: [VehicleTypesController],
  providers: [VehicleTypesService],
})
export class VehicleTypesModule {}
