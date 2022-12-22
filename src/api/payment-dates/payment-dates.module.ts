import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HandleExceptions } from '../../common/helpers/handle.exceptions';
import { PaymentDatesService } from './payment-dates.service';
import { PaymentDatesController } from './payment-dates.controller';
import { Credit } from '../../database/models/credit.entity';
import { Payment } from '../../database/models/payment.entity';
import { PaymentDate } from '../../database/models/payment-date.entity';

@Module({
  controllers: [PaymentDatesController],
  providers: [PaymentDatesService, HandleExceptions],
  imports: [TypeOrmModule.forFeature([Payment, PaymentDate, Credit])],
})
export class PaymentDatesModule {}
