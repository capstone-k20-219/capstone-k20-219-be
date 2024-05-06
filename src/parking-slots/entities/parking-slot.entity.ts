import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { Base } from '../../shared/entities/base.entity';
import { VehicleType } from '../../vehicle-types/entities/vehicle-type.entity';
import { ParkingTicket } from '../../parking-tickets/entities/parking-ticket.entity';
import { SlotBooking } from '../../slot-bookings/entities/slot-booking.entity';

@Entity('parking_slot')
export class ParkingSlot extends Base {
  @PrimaryColumn({ type: 'varchar', length: 10 })
  id: string;

  @Column({ default: null })
  typeId: string;

  @Column({ type: 'real', default: 0 })
  x_start: number;

  @Column({ type: 'real', default: 0 })
  x_end: number;

  @Column({ type: 'real', default: 0 })
  y_start: number;

  @Column({ type: 'real', default: 0 })
  y_end: number;

  @ManyToOne(() => VehicleType, (type) => type.slots, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'typeId' })
  type: VehicleType;

  @OneToMany(() => ParkingTicket, (ticket) => ticket.slot)
  tickets: ParkingTicket[];

  @OneToMany(() => SlotBooking, (booking) => booking.slot)
  bookings: SlotBooking[];
}
