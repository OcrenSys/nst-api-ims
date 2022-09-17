import { Invoice } from 'src/invoices/entities/invoice.entity';
import { PaymentDate } from 'src/payment-dates/entities/payment-date.entity';
import { Payment } from 'src/payments/entities/payment.entity';
import { Percent } from 'src/percents/entities/percent.entity';
import { Base } from 'src/utilities/classes/Base.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Credit extends Base {
  @Column()
  fee: number;
  @Column()
  rate: number;
  @OneToMany(() => Payment, (payment) => payment.credit)
  payments: Payment[];
  @OneToMany(() => PaymentDate, (paymentDate) => paymentDate.credit)
  paymentDates: PaymentDate[];
  @ManyToOne(() => Percent, (percent) => percent.credits)
  percent: Percent;
  @OneToOne(() => Invoice, (invoice) => invoice.credit)
  @JoinColumn()
  invoice: Invoice;
}
