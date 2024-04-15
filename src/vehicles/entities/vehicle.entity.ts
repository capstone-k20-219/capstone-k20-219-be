import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseEntity } from 'src/shared/entities/base.entity';

@Schema({ collection: 'Vehicles', timestamps: true })
export class VehicleEntity extends BaseEntity {
  @Prop()
  user_id: string;

  @Prop()
  plate_no: string;

  @Prop()
  type_code: string;
}

export const VehicleSchema = SchemaFactory.createForClass(VehicleEntity);
