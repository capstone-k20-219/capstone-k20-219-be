import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseEntity } from 'src/shared/entities/base.entity';

@Schema({ collection: 'Services', timestamps: true })
export class ServiceEntity extends BaseEntity {
  @Prop()
  code: string;

  @Prop()
  name: string;

  @Prop()
  price: IServicePrice[];
}

export class IServicePrice {
  type_id: string;
  price: number;
}

export const ServiceSchema = SchemaFactory.createForClass(ServiceEntity);
