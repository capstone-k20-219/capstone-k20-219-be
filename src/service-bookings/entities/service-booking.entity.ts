import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Base } from '../../shared/entities/base.entity';
import { ParkingTicket } from '../../parking-tickets/entities/parking-ticket.entity';
import { Service } from '../../services/entities/service.entity';

@Entity('service_booking')
export class ServiceBooking extends Base {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  ticketId: string;

  @Column()
  serviceId: string;

  @Column({ type: 'real', default: 0 })
  quantity: number;

  @Column({ type: 'real', default: 0 })
  cost: number;

  @Column({ default: false })
  isDone: boolean;

  @ManyToOne(() => ParkingTicket, (ticket) => ticket.serviceBookings, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'ticketId' })
  ticket: ParkingTicket;

  @ManyToOne(() => Service, (service) => service.bookings, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'serviceId' })
  service: Service;
}
