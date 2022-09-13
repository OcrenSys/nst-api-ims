import { Banner } from 'src/banners/entities/banner.entity';
import { Brand } from 'src/brands/entities/brand.entity';
import { Category } from 'src/categories/entities/category.entity';
import { Image } from 'src/images/entities/image.entity';
import { InvoicesDetail } from 'src/invoices-details/entities/invoices-detail.entity';
import { Section } from 'src/sections/entities/section.entity';
import { Variant } from 'src/variants/entities/variant.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  code: string;
  @Column()
  name: string;
  @Column()
  price: number;
  @Column()
  price_credit: number;
  @Column()
  cost: number;
  @Column()
  description: string;
  @Column()
  stock: number;
  @Column()
  order: number;
  @OneToMany(() => Image, (image) => image.product)
  images: Image[];
  @OneToMany(() => Variant, (variant) => variant.product)
  variants: Variant[];
  @OneToOne(() => InvoicesDetail, (invoiceDetails) => invoiceDetails.product)
  invoiceDetail: InvoicesDetail;
  @ManyToOne(() => Category, (category) => category.products)
  category: Category;
  @ManyToOne(() => Brand, (brand) => brand.products)
  brand: Brand;
  @ManyToOne(() => Section, (section) => section.products)
  section: Section;
  @ManyToOne(() => Banner, (banner) => banner.products)
  banner: Banner;
}
