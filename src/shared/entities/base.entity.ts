import { Prop } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export class BaseEntity extends Document {
  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;

  @Prop()
  deletedAt: Date;
}