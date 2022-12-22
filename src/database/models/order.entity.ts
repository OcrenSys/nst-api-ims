import { Column, Entity, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { Credit } from './credit.entity';
import { Customer } from './customer.entity';
import { OrderDetail } from './order-detail.entity';
import { Base } from './base.entity';
import { Member } from './member.entity';

@Entity()
export class Order extends Base {
  @Column()
  isAnulated: boolean;

  @Column()
  isCompleted: boolean;

  @Column({ nullable: true })
  comment: string;

  @OneToOne(() => Credit, (credit) => credit.order, {
    nullable: true,
    eager: true,
  })
  credit?: Credit;

  @OneToMany(() => OrderDetail, (ordersDetail) => ordersDetail.order, {
    cascade: true,
  })
  orderDetails?: OrderDetail[];

  @ManyToOne(() => Customer, (customer) => customer.orders, {
    eager: true,
    nullable: true,
  })
  customer?: Customer;

  @ManyToOne(() => Member, (member) => member.orders, { eager: true })
  member: Member;
}
