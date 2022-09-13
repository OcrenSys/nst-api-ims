import { Credit } from 'src/credits/entities/credit.entity';
import { Invoice } from 'src/invoices/entities/invoice.entity';
import { Payment } from 'src/payments/entities/payment.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class PaymentDate {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  amount: number;
  @Column()
  date: string;
  @ManyToOne(() => Credit, (credit) => credit.paymentDates)
  credit: Credit;
  @OneToOne(() => Payment, (payment) => payment.paymentDate)
  @JoinColumn()
  payment: Payment;
}
