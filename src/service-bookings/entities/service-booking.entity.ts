import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseEntity } from 'src/shared/entities/base.entity';

@Schema({ collection: 'ServiceBookings', timestamps: true })
export class ServiceBookingEntity extends BaseEntity {
  @Prop()
  parking_ticket_id: string;

  @Prop()
  service_id: string;

  @Prop()
  status: string;

  @Prop()
  quantity: number;
}

export const ServiceBookingSchema =
  SchemaFactory.createForClass(ServiceBookingEntity);
