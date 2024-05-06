import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Base } from '../../shared/entities/base.entity';
import { User } from '../../users/entities/user.entity';
import { VehicleType } from '../../vehicle-types/entities/vehicle-type.entity';
import { SlotBooking } from '../../slot-bookings/entities/slot-booking.entity';

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

  @OneToMany(() => SlotBooking, (slotBooking) => slotBooking.vehicle)
  slotBookings: SlotBooking[];
}
