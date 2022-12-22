import { Column, Entity, ManyToOne, OneToOne } from 'typeorm';
import { Credit } from './credit.entity';
import { PaymentDate } from './payment-date.entity';
import { Base } from './base.entity';

@Entity()
export class Payment extends Base {
  @Column()
  date: string;

  @Column()
  amount: number;

  @ManyToOne(() => Credit, (credit) => credit.payments)
  credit: Credit;

  @OneToOne(() => PaymentDate, (paymentDate) => paymentDate.payment)
  paymentDate: PaymentDate;
}
