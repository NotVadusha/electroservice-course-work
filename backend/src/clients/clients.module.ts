import { Module } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { ClientsController } from './clients.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Clients } from './entities/client.entity';
import { CounterIndicators } from './entities/counter_indicator.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Clients, CounterIndicators])],
  controllers: [ClientsController],
  providers: [ClientsService],
})
export class ClientsModule {}
