import { Column, Entity, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { Image } from './image.entity';
import { OrderDetail } from './order-detail.entity';
import { Product } from './product.entity';
import { Base } from './base.entity';

@Entity()
export class Variant extends Base {
  @Column({ unique: true, nullable: true })
  code?: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  description?: string;

  @Column()
  price: number;

  @Column()
  priceCredit: number;

  @Column()
  cost: number;

  @Column()
  stock: number;

  @Column({ default: 0 })
  position?: number;

  @Column({ default: false })
  isPublished?: boolean;

  @OneToOne(() => OrderDetail, (invoiceDetails) => invoiceDetails.variant, {
    nullable: true,
  })
  invoiceDetail?: OrderDetail;

  @OneToMany(() => Image, (image) => image.variant, { nullable: true })
  images?: Image[];

  @ManyToOne(() => Product, (product) => product.variants, {
    onDelete: 'CASCADE',
  })
  product?: Product;
}
