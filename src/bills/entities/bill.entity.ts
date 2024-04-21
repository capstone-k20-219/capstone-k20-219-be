import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseEntity } from 'src/shared/entities/base.entity';

export interface IBillItem {
  service_id: string;
  cost: number;
}

@Schema({ collection: 'Bills', timestamps: true })
export class BillEntity extends BaseEntity {
  @Prop()
  user_id: string;

  @Prop()
  parking_ticket_id: string;

  @Prop()
  parking_cost: number;

  @Prop()
  items: IBillItem[];

  @Prop()
  is_paid: boolean;
}

export const BillSchema = SchemaFactory.createForClass(BillEntity);
