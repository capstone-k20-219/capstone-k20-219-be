import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Base } from 'src/shared/entities/base.entity';
import { VehicleType } from 'src/vehicle-types/entities/vehicle-type.entity';
import { Comment } from 'src/comments/entities/comment.entity';

@Entity('service')
export class Service extends Base {
  @PrimaryColumn()
  id: string;

  @Column({ type: 'varchar', length: 50 })
  name: string;

  @OneToMany(() => ServicePrice, (price) => price.service, { cascade: true })
  prices: ServicePrice[];

  @OneToMany(() => Comment, (comment) => comment.service)
  comments: Comment[];
}

@Entity('service_price')
export class ServicePrice extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  typeId: string;

  @Column({ type: 'real', default: 0 })
  unitPrice: number;

  @ManyToOne(() => Service, (service) => service.prices, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  @JoinColumn({ name: 'serviceId' })
  service: Service;

  @ManyToOne(() => VehicleType, (type) => type.prices, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  @JoinColumn({ name: 'typeId' })
  type: VehicleType[];
}