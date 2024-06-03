import { Clients } from 'src/clients/entities/client.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';

@Entity('emergencies')
export class Emergencies {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  created_at: Date;

  @Column()
  description: string;

  @Column()
  status: string;

  @ManyToMany(() => Clients, (client) => client.emergencies)
  clients: Clients[];
}
