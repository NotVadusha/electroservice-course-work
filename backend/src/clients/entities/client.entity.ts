import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { Emergencies } from 'src/emergencies/entities/emergency.entity';
import { Contracts } from 'src/contracts/entities/contract.entity';
import { Payments } from 'src/payments/entities/payment.entity';
import { CounterIndicators } from './counter_indicator.entity';
import { Addresses } from './addresses.entity';

@Entity('clients')
export class Clients {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column({ nullable: true })
  role: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @OneToOne(() => Addresses, (address) => address.client)
  @JoinColumn({ name: 'address_id' })
  address: Addresses;

  @Column()
  phone_integer: string;

  @ManyToMany(() => Contracts, (contract) => contract.client)
  @JoinTable({
    name: 'clients_contracts',
    joinColumn: { name: 'client_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'contract_id', referencedColumnName: 'id' },
  })
  contracts: Contracts[];

  @ManyToMany(() => Emergencies, (emergency) => emergency.clients, {
    cascade: true,
  })
  @JoinTable({
    name: 'emergencies_clients',
    joinColumn: { name: 'client_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'emergency_id', referencedColumnName: 'id' },
  })
  emergencies: Emergencies[];

  @ManyToMany(() => Payments, (payment) => payment.clients)
  @JoinTable({
    name: 'payments_clients',
    joinColumn: { name: 'client_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'payment_id', referencedColumnName: 'id' },
  })
  payments: Payments[];

  @ManyToMany(() => CounterIndicators, (indicator) => indicator.clients)
  @JoinTable({
    name: 'counter_indicators_clients',
    joinColumn: { name: 'client_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'indicator_id', referencedColumnName: 'id' },
  })
  counterIndicators: CounterIndicators[];
}
