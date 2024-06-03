import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
} from 'typeorm';

import { Clients } from 'src/clients/entities/client.entity';
import { PaymentTypes } from './payment_types.entity';

@Entity('payments')
export class Payments {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  description: string;

  @Column()
  created_at: Date;

  @Column()
  payment_url: string;

  @ManyToOne(() => PaymentTypes, (paymentType) => paymentType.payments)
  paymentType: PaymentTypes;

  @ManyToMany(() => Clients, (client) => client.payments)
  clients: Clients[];
}
