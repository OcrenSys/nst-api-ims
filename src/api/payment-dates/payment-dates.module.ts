import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HandleExceptions } from '../..common/helpers/handle.exceptions';
import { PaymentDatesService } from './payment-dates.service';
import { PaymentDatesController } from './payment-dates.controller';
import { Credit } from '../credits/entities/credit.entity';
import { Payment } from '../payments/entities/payment.entity';
import { PaymentDate } from './entities/payment-date.entity';

@Module({
  controllers: [PaymentDatesController],
  providers: [PaymentDatesService, HandleExceptions],
  imports: [TypeOrmModule.forFeature([Payment, PaymentDate, Credit])],
})
export class PaymentDatesModule {}
