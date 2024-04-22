import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Base } from 'src/shared/entities/base.entity';
import { Vehicle } from 'src/vehicles/entities/vehicle.entity';

@Entity('vehicle_type')
export class VehicleType extends Base {
  @PrimaryColumn({ length: 3 })
  id: string;

  @Column()
  name: string;

  @Column({ default: 0 })
  parkingFee: number;

  @Column({ default: 0 })
  slotBookingFee: number;

  @OneToMany(() => Vehicle, (vehicle) => vehicle.type)
  vehicles: Vehicle[];
}
