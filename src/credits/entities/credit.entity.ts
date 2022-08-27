import { PaymentDate } from 'src/payment-dates/entities/payment-date.entity';
import { Payment } from 'src/payments/entities/payment.entity';
import { Percent } from 'src/percents/entities/percent.entity';
import { Base } from 'src/utilities/classes/base.entity';

export class Credit extends Base {
  fee: number;
  rate: number;
  payments: Payment[];
  paymentDates: PaymentDate[];
  percent: Percent;
}
