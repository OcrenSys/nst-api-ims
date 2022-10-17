import { Module } from '@nestjs/common';
import { CreditsService } from './credits.service';
import { CreditsController } from './credits.controller';
import { HandleExceptions } from 'src/common/helpers/handle.exceptions';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Credit } from './entities/credit.entity';
import { Invoice } from '../invoices/entities/invoice.entity';
import { Payment } from '../payments/entities/payment.entity';
import { PaymentDate } from '../payment-dates/entities/payment-date.entity';
import { Percent } from '../percents/entities/percent.entity';

@Module({
  controllers: [CreditsController],
  providers: [CreditsService, HandleExceptions],
  imports: [
    TypeOrmModule.forFeature([Credit, Invoice, Payment, PaymentDate, Percent]),
  ],
})
export class CreditsModule {}
