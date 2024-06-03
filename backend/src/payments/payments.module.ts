import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentTypes } from './entities/payment_types.entity';
import { Payments } from './entities/payment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PaymentTypes, Payments])],
  controllers: [PaymentsController],
  providers: [PaymentsService],
})
export class PaymentsModule {}
