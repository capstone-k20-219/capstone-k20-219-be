import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseEntity } from 'src/shared/entities/base.entity';

@Schema({ collection: 'Services', timestamps: true })
export class ServiceEntity extends BaseEntity {
  @Prop({ unique: true, required: true, type: String })
  code: string;

  @Prop()
  name: string;

  @Prop()
  price: IServicePrice[] | number;
}

export class IServicePrice {
  type_code: string;
  price: number;
}

export const ServiceSchema = SchemaFactory.createForClass(ServiceEntity);
