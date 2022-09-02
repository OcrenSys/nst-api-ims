import { Invoice } from 'src/invoices/entities/invoice.entity';
import { PaymentDate } from 'src/payment-dates/entities/payment-date.entity';
import { Column, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

export class Payment {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  date: string;
  @Column()
  amount: number;
  invoice: Invoice;
  @OneToOne(() => PaymentDate, (paymentDate) => paymentDate.payment)
  paymentDate: PaymentDate;
}
