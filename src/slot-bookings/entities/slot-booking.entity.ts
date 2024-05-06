import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Base } from '../../shared/entities/base.entity';
import { ParkingSlot } from '../../parking-slots/entities/parking-slot.entity';
import { Vehicle } from '../../vehicles/entities/vehicle.entity';

@Entity('slot_booking')
export class SlotBooking extends Base {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  slotId: string;

  @Column()
  vehicleId: number;

  @Column()
  arrivalTime: Date;

  @ManyToOne(() => ParkingSlot, (slot) => slot.bookings, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'slotId' })
  slot: ParkingSlot;

  @ManyToOne(() => Vehicle, (vehicle) => vehicle.slotBookings, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'vehicleId' })
  vehicle: Vehicle;
}
