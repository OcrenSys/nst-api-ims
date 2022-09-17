import { Brand } from 'src/brands/entities/brand.entity';
import { Image } from 'src/images/entities/image.entity';
import { InvoicesDetail } from 'src/invoices-details/entities/invoices-detail.entity';
import { Product } from 'src/products/entities/product.entity';
import { Base } from 'src/utilities/classes/Base.entity';
import { Column, Entity, ManyToOne, OneToMany, OneToOne } from 'typeorm';

@Entity()
export class Variant extends Base {
  @Column()
  name: string;
  @Column()
  code: string;
  @Column()
  description: string;
  @Column()
  price: number;
  @Column()
  priceCredit: number;
  @Column()
  cost: number;
  @Column()
  stock: number;
  @Column()
  order: number;
  @Column({ default: false })
  isPublished: boolean;
  @OneToOne(() => InvoicesDetail, (invoiceDetails) => invoiceDetails.product)
  invoiceDetail: InvoicesDetail;
  @OneToMany(() => Image, (image) => image.variant)
  images: Image[];
  @ManyToOne(() => Product, (product) => product.variants)
  product: Product;
  @ManyToOne(() => Brand, (brand) => brand.variants)
  brand: Brand;
}
