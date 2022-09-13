import { Invoice } from 'src/invoices/entities/invoice.entity';
import { PaymentDate } from 'src/payment-dates/entities/payment-date.entity';
import { Payment } from 'src/payments/entities/payment.entity';
import { Percent } from 'src/percents/entities/percent.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Credit {
  @PrimaryGeneratedColumn()
  id: number;
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
