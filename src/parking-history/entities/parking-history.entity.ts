import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseEntity } from 'src/shared/entities/base.entity';

@Schema({ collection: 'ParkingHistories', timestamps: true })
export class ParkingHistoryEntity extends BaseEntity {
  @Prop()
  slot_id: string;

  @Prop()
  vehicle_id: string;

  @Prop()
  check_out_time: Date;

  @Prop()
  status: string;
}

export const ParkingHistorySchema =
  SchemaFactory.createForClass(ParkingHistoryEntity);
