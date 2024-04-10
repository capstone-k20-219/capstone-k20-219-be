import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseEntity } from 'src/shared/entities/base.entity';
import { UserRoleEnum } from '../enums/user-role.enum';

@Schema({ collection: 'Users', timestamps: true })
export class UserEntity extends BaseEntity {
  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  name: string;

  @Prop()
  dob: Date;

  @Prop()
  phone: string;

  @Prop()
  image: string;

  @Prop()
  bank_account: IBankAccount[];

  @Prop()
  role: UserRoleEnum[];
}

export class IBankAccount {
  account_no: string;
  bank: string;
}

export const UserSchema = SchemaFactory.createForClass(UserEntity);
