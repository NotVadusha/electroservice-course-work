import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Clients } from './client.entity';

@Entity('counter_indicators')
export class CounterIndicators {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  usage: number;

  @Column()
  month: string;

  @Column()
  status: string;

  @Column()
  captured_at: Date;

  @ManyToMany(() => Clients, (client) => client.counterIndicators, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  clients: Clients[];
}
