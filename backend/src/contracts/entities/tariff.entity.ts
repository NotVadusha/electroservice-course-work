import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
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

  @OneToMany(() => Contracts, (contract) => contract.tariff, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  contracts: Contracts[];
}
