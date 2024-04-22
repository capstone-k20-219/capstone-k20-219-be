import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Base } from 'src/shared/entities/base.entity';
import { User } from 'src/users/entities/user.entity';
import { VehicleType } from 'src/vehicle-types/entities/vehicle-type.entity';

@Entity('vehicle')
export class Vehicle extends Base {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  plateNo: string;

  @Column({ type: 'text', default: '' })
  description: string;

  @Column()
  typeId: string;

  @Column()
  userId: string;

  @ManyToOne(() => User, (user) => user.vehicles, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => VehicleType, (type) => type.vehicles, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'typeId' })
  type: VehicleType;
}
