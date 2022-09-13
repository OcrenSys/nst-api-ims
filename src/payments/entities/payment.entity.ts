import { Credit } from 'src/credits/entities/credit.entity';
import { PaymentDate } from 'src/payment-dates/entities/payment-date.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  date: string;
  @Column()
  amount: number;
  @ManyToOne(() => Credit, (credit) => credit.payments)
  credit: Credit;
  @OneToOne(() => PaymentDate, (paymentDate) => paymentDate.payment)
  paymentDate: PaymentDate;
}
