import { Invoice } from 'src/invoices/entities/invoice.entity';
import { PaymentDate } from 'src/payment-dates/entities/payment-date.entity';
import { Payment } from 'src/payments/entities/payment.entity';
import { Percent } from 'src/percents/entities/percent.entity';
import {
  Column,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

export class Credit {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  fee: number;
  @Column()
  rate: number;
  @OneToMany(() => Payment, (payment) => payment.invoice)
  payments: Payment[];
  @OneToMany(() => PaymentDate, (paymentDate) => paymentDate.invoice)
  paymentDates: PaymentDate[];
  @ManyToOne(() => Percent, (percent) => percent.invoices)
  percent: Percent;
  @OneToOne(() => Invoice, (invoice) => invoice.credit)
  invoice: Invoice;
}
