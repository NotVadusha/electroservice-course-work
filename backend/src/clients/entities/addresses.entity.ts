import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { Clients } from './client.entity';

@Entity('addresses')
export class Addresses {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  city: string;

  @Column()
  street: string;

  @Column()
  number: number;

  @OneToOne(() => Clients, (client) => client.address, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  client: Clients;
}
