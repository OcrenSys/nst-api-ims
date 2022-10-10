import { Brand } from '../../brands/entities/brand.entity';
import { Image } from '../../images/entities/image.entity';
import { InvoicesDetail } from '../../invoices-details/entities/invoices-detail.entity';
import { Product } from '../../products/entities/product.entity';
import { Base } from '../../../common/models/base.entity';
import { Column, Entity, ManyToOne, OneToMany, OneToOne } from 'typeorm';

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
  order?: number;

  @Column({ default: false })
  isPublished?: boolean;

  @OneToOne(() => InvoicesDetail, (invoiceDetails) => invoiceDetails.variant, {
    nullable: true,
  })
  invoiceDetail?: InvoicesDetail;

  @OneToMany(() => Image, (image) => image.variant, { nullable: true })
  images?: Image[];

  @ManyToOne(() => Product, (product) => product.variants, {
    onDelete: 'CASCADE',
  })
  product?: Product;

  @ManyToOne(() => Brand, (brand) => brand.variants, { nullable: true })
  brand?: Brand;
}
