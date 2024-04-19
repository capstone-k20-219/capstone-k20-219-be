import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseEntity } from 'src/shared/entities/base.entity';

@Schema({ collection: 'Comments', timestamps: true })
export class CommentEntity extends BaseEntity {
  @Prop()
  user_id: string;

  @Prop()
  service_id: string;

  @Prop()
  content: string;

  @Prop()
  rating: number;
}

export const CommentSchema = SchemaFactory.createForClass(CommentEntity);
