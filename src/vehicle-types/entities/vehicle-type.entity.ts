import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseEntity } from 'src/shared/entities/base.entity';

@Schema({ collection: 'VehicleTypes', timestamps: true })
export class VehicleTypeEntity extends BaseEntity {
  @Prop()
  code: string;

  @Prop()
  type: string;
}

export const VehicleTypeSchema =
  SchemaFactory.createForClass(VehicleTypeEntity);
