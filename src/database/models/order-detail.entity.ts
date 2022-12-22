import { Column, Entity, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import { Order } from './order.entity';
import { Product } from './product.entity';
import { Base } from './base.entity';
import { Variant } from './variant.entity';

@Entity()
export class OrderDetail extends Base {
  @Column()
  price: number;

  @Column()
  cost: number;

  @Column()
  amount: number;

  @ManyToOne(() => Order, (order) => order.orderDetails, {
    onDelete: 'CASCADE',
  })
  order: Order;

  @OneToOne(() => Product, (product) => product.orderDetail, {
    eager: true,
  })
  @JoinColumn()
  product: Product;

  @OneToOne(() => Variant, (variant) => variant.orderDetail, {
    nullable: true,
    eager: true,
  })
  @JoinColumn()
  variant?: Variant;
}
