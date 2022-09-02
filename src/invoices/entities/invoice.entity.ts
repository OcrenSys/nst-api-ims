import { Credit } from 'src/credits/entities/credit.entity';
import { Customer } from 'src/customers/entities/customer.entity';
import { InvoicesDetail } from 'src/invoices-details/entities/invoices-detail.entity';
import { PaymentDate } from 'src/payment-dates/entities/payment-date.entity';
import { Percent } from 'src/percents/entities/percent.entity';
import {
  Column,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

export class Invoice {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  customer: Customer;
  @Column()
  isAnulated: boolean;
  @Column()
  isCompleted: boolean;
  @Column()
  comment: string;
  @OneToOne(() => Credit, (credit) => credit.invoice)
  credit: Credit;
  @OneToMany(() => InvoicesDetail, (invoicesDetail) => invoicesDetail.invoice)
  invoiceDetails: InvoicesDetail[];
  @OneToMany(() => PaymentDate, (paymentDate) => paymentDate.invoice)
  paymentDates: PaymentDate[];
  @ManyToOne(() => Percent, (percent) => percent.invoices)
  percent: Percent;
}
