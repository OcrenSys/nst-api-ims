import { Module } from '@nestjs/common';
import { PaymentDatesService } from './payment-dates.service';
import { PaymentDatesController } from './payment-dates.controller';

@Module({
  controllers: [PaymentDatesController],
  providers: [PaymentDatesService]
})
export class PaymentDatesModule {}
