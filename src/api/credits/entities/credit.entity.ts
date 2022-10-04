import { Invoice } from '../../invoices/entities/invoice.entity';
import { PaymentDate } from '../../payment-dates/entities/payment-date.entity';
import { Payment } from '../../payments/entities/payment.entity';
import { Percent } from '../../percents/entities/percent.entity';
import { Base } from '../../../common/models/base.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Credit extends Base {
  @Column()
  fee: number;

  @Column()
  rate: number;

  @Column({ default: false })
  isExonerated?: boolean;

  @OneToMany(() => Payment, (payment) => payment.credit, { nullable: true })
  payments?: Payment[];

  @OneToMany(() => PaymentDate, (paymentDate) => paymentDate.credit, {
    nullable: true,
  })
  paymentDates?: PaymentDate[];

  @ManyToOne(() => Percent, (percent) => percent.credits)
  percent: Percent;

  @OneToOne(() => Invoice, (invoice) => invoice.credit, { nullable: true })
  @JoinColumn()
  invoice?: Invoice;
}
