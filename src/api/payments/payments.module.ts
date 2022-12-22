import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HandleExceptions } from '../../common/helpers/handle.exceptions';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { Payment } from '../../database/models/payment.entity';
import { PaymentDate } from '../../database/models/payment-date.entity';
import { Credit } from '../../database/models/credit.entity';

@Module({
  controllers: [PaymentsController],
  providers: [PaymentsService, HandleExceptions],
  imports: [TypeOrmModule.forFeature([Payment, PaymentDate, Credit])],
})
export class PaymentsModule {}
