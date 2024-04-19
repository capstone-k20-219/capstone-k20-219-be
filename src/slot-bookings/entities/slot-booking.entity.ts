import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseEntity } from 'src/shared/entities/base.entity';

@Schema({ collection: 'SlotBookings', timestamps: true })
export class SlotBookingEntity extends BaseEntity {
  @Prop()
  slot_id: string;

  @Prop()
  user_id: string;

  @Prop()
  vehicle_id: string;

  @Prop()
  arrival_time: Date;
}

export const SlotBookingSchema =
  SchemaFactory.createForClass(SlotBookingEntity);
