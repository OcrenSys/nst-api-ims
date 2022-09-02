import { Invoice } from 'src/invoices/entities/invoice.entity';
import { Payment } from 'src/payments/entities/payment.entity';
import { Column, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

export class PaymentDate {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  amount: number;
  @Column()
  date: string;
  @ManyToOne(() => Invoice, (invoice) => invoice.paymentDates)
  invoice: Invoice;
  @OneToOne(() => Payment, (payment) => payment.paymentDate)
  payment: Payment;
}
