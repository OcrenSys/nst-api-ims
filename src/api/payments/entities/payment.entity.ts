import { Column, Entity, ManyToOne, OneToOne } from 'typeorm';
import { Credit } from '../../credits/entities/credit.entity';
import { PaymentDate } from '../../payment-dates/entities/payment-date.entity';
import { Base } from '../../../common/models/base.entity';

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
