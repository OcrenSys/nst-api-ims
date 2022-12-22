import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Order } from './order.entity';
import { PaymentDate } from './payment-date.entity';
import { Payment } from './payment.entity';
import { Percent } from './percent.entity';
import { Base } from './base.entity';

@Entity()
export class Credit extends Base {
  @Column()
  fee: number;

  @Column()
  rate: number;

  @Column({ default: '' })
  comment?: string;

  @Column({ default: false })
  isExonerated?: boolean;

  @OneToOne(() => Order, (order) => order.credit, { nullable: true })
  @JoinColumn()
  order?: Order;

  @ManyToOne(() => Percent, (percent) => percent.credits)
  percent: Percent;

  @OneToMany(() => Payment, (payment) => payment.credit, { nullable: true })
  payments?: Payment[];

  @OneToMany(() => PaymentDate, (paymentDate) => paymentDate.credit, {
    nullable: true,
  })
  paymentDates?: PaymentDate[];
}
