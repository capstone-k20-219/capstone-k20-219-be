import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Base } from '../../shared/entities/base.entity';
import { User } from '../../users/entities/user.entity';
import { Service } from '../../services/entities/service.entity';

@Entity('comment')
export class Comment extends Base {
  @PrimaryColumn()
  id: string;

  @Column()
  userId: string;

  @Column()
  serviceId: string;

  @Column({ type: 'text' })
  content: string;

  @Column({ type: 'int', default: 5 })
  rating: number;

  @ManyToOne(() => User, (user) => user.comments, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Service, (service) => service.comments, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'serviceId' })
  service: Service;
}
