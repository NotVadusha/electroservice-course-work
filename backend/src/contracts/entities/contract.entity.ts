import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Clients } from 'src/clients/entities/client.entity';
import { Tariffs } from './tariff.entity';

@Entity('contracts')
export class Contracts {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  description: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @ManyToOne(() => Clients)
  @JoinColumn({ name: 'client_id' })
  client: Clients;

  @ManyToOne(() => Tariffs)
  @JoinColumn({ name: 'tariff_id' })
  tariff: Tariffs;
}
