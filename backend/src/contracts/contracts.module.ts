import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ContractsService } from './contracts.service';
import { ContractsController } from './contracts.controller';
import { Contracts } from './entities/contract.entity';
import { Tariffs } from './entities/tariff.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Contracts, Tariffs])],
  controllers: [ContractsController],
  providers: [ContractsService],
})
export class ContractsModule {}
