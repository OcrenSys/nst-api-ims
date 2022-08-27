import { Invoice } from 'src/invoices/entities/invoice.entity';
import { PaymentDate } from 'src/payment-dates/entities/payment-date.entity';
import { Base } from 'src/utilities/classes/base.entity';

export class Payment extends Base {
  date: string;
  amount: number;
  invoice: Invoice;
  paymentDate: PaymentDate;
}
