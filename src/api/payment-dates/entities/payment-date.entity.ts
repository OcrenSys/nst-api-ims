import { Credit } from '../../credits/entities/credit.entity';
import { Payment } from '../../payments/entities/payment.entity';
import { Base } from '../../../common/models/base.entity';
import { Column, Entity, ManyToOne, OneToOne, JoinColumn } from 'typeorm';

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
