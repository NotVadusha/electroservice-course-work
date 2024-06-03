import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Clients } from './client.entity';

@Entity('counter_indicators')
export class CounterIndicators {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  usage: number;

  @Column()
  caputred_at: Date;

  @ManyToMany(() => Clients, (client) => client.counterIndicators)
  clients: Clients[];
}
