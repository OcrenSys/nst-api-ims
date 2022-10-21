import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HandleExceptions } from '../../common/helpers/handle.exceptions';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { Payment } from './entities/payment.entity';
import { PaymentDate } from '../payment-dates/entities/payment-date.entity';
import { Credit } from '../credits/entities/credit.entity';

@Module({
  controllers: [PaymentsController],
  providers: [PaymentsService, HandleExceptions],
  imports: [TypeOrmModule.forFeature([Payment, PaymentDate, Credit])],
})
export class PaymentsModule {}
