import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { Base } from 'src/shared/entities/base.entity';
import { VehicleType } from 'src/vehicle-types/entities/vehicle-type.entity';

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
}
