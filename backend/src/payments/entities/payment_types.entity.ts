import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Payments } from './payment.entity';

@Entity('payment_types')
export class PaymentTypes {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @OneToMany(() => Payments, (payment) => payment.paymentType)
  payments: Payments[];
}
