import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Contracts } from './contract.entity';

@Entity('tariffs')
export class Tariffs {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column()
  description: string;

  @OneToMany(() => Contracts, (contract) => contract.tariff)
  @JoinColumn({ name: 'tariff_id' })
  contracts: Contracts[];
}
