import { Module } from '@nestjs/common';
import { EmergenciesService } from './emergencies.service';
import { EmergenciesController } from './emergencies.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Emergencies } from './entities/emergency.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Emergencies])],
  controllers: [EmergenciesController],
  providers: [EmergenciesService],
})
export class EmergenciesModule {}
