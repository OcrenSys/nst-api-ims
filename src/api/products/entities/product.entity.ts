import { Banner } from '../../banners/entities/banner.entity';
import { Brand } from '../../brands/entities/brand.entity';
import { Category } from '../../categories/entities/category.entity';
import { Image } from '../../images/entities/image.entity';
import { InvoicesDetail } from '../../invoices-details/entities/invoices-detail.entity';
import { Section } from '../../sections/entities/section.entity';
import { Variant } from '../../variants/entities/variant.entity';
import { Column, Entity, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { Base } from '../../../utilities/classes/base.entity';

@Entity()
export class Product extends Base {
  @Column()
  code: string;
  @Column()
  name: string;
  @Column()
  price: number;
  @Column()
  priceCredit: number;
  @Column()
  cost: number;
  @Column()
  description: string;
  @Column()
  stock: number;
  @Column()
  order: number;
  @Column({ default: false })
  isPublished: boolean;
  @OneToMany(() => Image, (image) => image.product, { nullable: true })
  images?: Image[];
  @OneToMany(() => Variant, (variant) => variant.product)
  variants?: Variant[];
  @OneToOne(() => InvoicesDetail, (invoiceDetails) => invoiceDetails.product, {
    nullable: true,
  })
  invoiceDetail?: InvoicesDetail;
  @ManyToOne(() => Category, (category) => category.products, {
    nullable: true,
  })
  category?: Category;
  @ManyToOne(() => Brand, (brand) => brand.products, { nullable: true })
  brand?: Brand;
  @ManyToOne(() => Section, (section) => section.products, { nullable: true })
  section?: Section;
  @ManyToOne(() => Banner, (banner) => banner.products, { nullable: true })
  banner?: Banner;
}
