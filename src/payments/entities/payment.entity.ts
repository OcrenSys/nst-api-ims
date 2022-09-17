import { Credit } from 'src/credits/entities/credit.entity';
import { PaymentDate } from 'src/payment-dates/entities/payment-date.entity';
import { Base } from 'src/utilities/classes/Base.entity';
import { Column, Entity, ManyToOne, OneToOne } from 'typeorm';

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
