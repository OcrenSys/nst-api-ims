import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HandleExceptions } from '../../common/helpers/handle.exceptions';
import { CreditsService } from './credits.service';
import { CreditsController } from './credits.controller';
import { Credit } from '../../database/models/credit.entity';
import { Order } from '../../database/models/order.entity';
import { Payment } from '../../database/models/payment.entity';
import { PaymentDate } from '../../database/models/payment-date.entity';
import { Percent } from '../../database/models/percent.entity';

@Module({
  controllers: [CreditsController],
  providers: [CreditsService, HandleExceptions],
  imports: [
    TypeOrmModule.forFeature([Credit, Order, Payment, PaymentDate, Percent]),
  ],
})
export class CreditsModule {}
