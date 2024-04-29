import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { Base } from 'src/shared/entities/base.entity';
import { ServiceBooking } from 'src/service-bookings/entities/service-booking.entity';
import { ParkingSlot } from 'src/parking-slots/entities/parking-slot.entity';
import { User } from 'src/users/entities/user.entity';

@Entity('parking_ticket')
export class ParkingTicket extends Base {
  @PrimaryColumn()
  id: string;

  @Column()
  slotId: string;

  @Column()
  plateNo: string;

  @Column({ nullable: true })
  userId: string;

  @Column({ nullable: true })
  checkOutTime: Date;

  @Column({ type: 'real', default: 0 })
  parkingCost: number;

  @Column({ default: false })
  isPaid: boolean;

  @OneToMany(() => ServiceBooking, (booking) => booking.ticket)
  serviceBookings: ServiceBooking[];

  @ManyToOne(() => ParkingSlot, (slot) => slot.tickets, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'slotId' })
  slot: ParkingSlot;

  @ManyToOne(() => User, (user) => user.tickets, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  user: User;
}
