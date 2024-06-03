import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
} from 'typeorm';
import { Clients } from 'src/clients/entities/client.entity';
import { Tariffs } from './tariff.entity';

@Entity('contracts')
export class Contracts {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  client_id: string;

  @Column()
  description: string;

  @Column()
  created_at: Date;

  @ManyToOne(() => Tariffs, (tariff) => tariff.contracts)
  tariff: Tariffs;

  @ManyToMany(() => Clients, (client) => client.contracts)
  clients: Clients[];
}
