import { Column, Entity, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import { Credit } from './credit.entity';
import { Payment } from './payment.entity';
import { Base } from './base.entity';

@Entity()
export class PaymentDate extends Base {
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
