import { Module } from '@nestjs/common';
import { PaymentDatesService } from './payment-dates.service';
import { PaymentDatesController } from './payment-dates.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HandleExceptions } from 'src/common/helpers/handle.exceptions';
import { Credit } from '../credits/entities/credit.entity';
import { Payment } from '../payments/entities/payment.entity';
import { PaymentDate } from './entities/payment-date.entity';

@Module({
  controllers: [PaymentDatesController],
  providers: [PaymentDatesService, HandleExceptions],
  imports: [TypeOrmModule.forFeature([Payment, PaymentDate, Credit])],
})
export class PaymentDatesModule {}
