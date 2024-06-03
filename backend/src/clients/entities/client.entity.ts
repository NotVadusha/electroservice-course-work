import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Emergencies } from 'src/emergencies/entities/emergency.entity';
import { Contracts } from 'src/contracts/entities/contract.entity';
import { Payments } from 'src/payments/entities/payment.entity';
import { CounterIndicators } from './counter_indicator.entity';

@Entity('clients')
export class Clients {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  address: string;

  @Column()
  phone_integer: string;

  @ManyToMany(() => Contracts, (contract) => contract.clients)
  @JoinTable({
    name: 'clients_contracts',
    joinColumn: { name: 'client_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'contract_id', referencedColumnName: 'id' },
  })
  contracts: Contracts[];

  @ManyToMany(() => Emergencies, (emergency) => emergency.clients)
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
