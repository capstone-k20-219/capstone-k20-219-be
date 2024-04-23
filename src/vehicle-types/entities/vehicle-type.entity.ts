import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Base } from 'src/shared/entities/base.entity';
import { Vehicle } from 'src/vehicles/entities/vehicle.entity';
import { ParkingSlot } from 'src/parking-slots/entities/parking-slot.entity';

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

  @OneToMany(() => ParkingSlot, (slot) => slot.type)
  slots: ParkingSlot[];
}
