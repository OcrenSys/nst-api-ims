import { Invoice } from 'src/invoices/entities/invoice.entity';
import { Payment } from 'src/payments/entities/payment.entity';
import { Base } from 'src/utilities/classes/base.entity';

export class PaymentDate extends Base {
  amount: number;
  date: string;
  invoice: Invoice;
  payment: Payment;
}
