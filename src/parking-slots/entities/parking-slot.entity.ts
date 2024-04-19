import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseEntity } from 'src/shared/entities/base.entity';

export class IParkingSlotCoordinate {
  x_start: number;
  x_end: number;
  y_start: number;
  y_end: number;
}

@Schema({ collection: 'ParkingSlots', timestamps: true })
export class ParkingSlotEntity extends BaseEntity {
  @Prop()
  code: string;

  @Prop()
  vehicle_type: string;

  @Prop()
  coordinate: IParkingSlotCoordinate;
}

export const ParkingSlotSchema =
  SchemaFactory.createForClass(ParkingSlotEntity);
