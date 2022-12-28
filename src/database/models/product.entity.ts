import { Column, Entity, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import {
  IsBoolean,
  IsInt,
  IsNumber,
  IsString,
  Length,
  Max,
  Min,
} from 'class-validator';
import { Banner } from './banner.entity';
import { Brand } from './brand.entity';
import { Image } from './image.entity';
import { OrderDetail } from './order-detail.entity';
import { Section } from './section.entity';
import { Variant } from './variant.entity';
import { Base } from './base.entity';
import { SubCategory } from './sub-category.entity';
import * as NUMBER from '../../common/constants/numbers.constants';

@Entity()
export class Product extends Base {
  @Column({ unique: true })
  @Length(NUMBER.N03, NUMBER.N30)
  code: string;

  @Column({ nullable: true })
  @IsString()
  @Length(NUMBER.N00, 200)
  description?: string;

  @Column()
  @IsNumber()
  @Min(NUMBER.N00, {
    message: `Product price should be greather than ${NUMBER.N00}`,
  })
  @Max(NUMBER.N10000, {
    message: `Product price should be a real number like this, ${NUMBER.N10000}`,
  })
  price: number;

  @Column()
  @IsNumber()
  @Min(NUMBER.N00, {
    message: `Product credit price should be greather than ${NUMBER.N00}`,
  })
  @Max(NUMBER.N10000, {
    message: `Product credit price should be a real number like this, ${NUMBER.N10000}`,
  })
  priceCredit: number;

  @Column()
  @IsNumber()
  @Min(NUMBER.N00, {
    message: `Product cost price should be greather than ${NUMBER.N00}`,
  })
  @Max(NUMBER.N10000, {
    message: `Product cost should be a real number like this, ${NUMBER.N10000}`,
  })
  cost: number;

  @Column()
  @IsInt()
  @Min(NUMBER.N00, {
    message: `Product stock should be greather than ${NUMBER.N00}`,
  })
  @Max(NUMBER.N10000, {
    message: `Product stock should be a real number like this, ${NUMBER.N10000}`,
  })
  stock: number;

  @Column({ default: 0 })
  @IsInt()
  @Min(NUMBER.N00)
  position: number;

  @Column({ default: false })
  @IsBoolean()
  isPublished: boolean;

  @OneToMany(() => Image, (image) => image.product, {
    cascade: true,
    eager: true,
  })
  images?: Image[];

  @OneToMany(() => Variant, (variant) => variant.product, {
    cascade: true,
  })
  variants?: Variant[];

  @OneToOne(() => OrderDetail, (orderDetails) => orderDetails.product, {
    nullable: true,
  })
  orderDetail?: OrderDetail;

  @ManyToOne(() => SubCategory, (subCategory) => subCategory.products, {
    nullable: true,
  })
  subCategory?: SubCategory;

  @ManyToOne(() => Brand, (brand) => brand.products, {
    nullable: true,
    eager: true,
  })
  brand?: Brand;

  @ManyToOne(() => Section, (section) => section.products, { nullable: true })
  section?: Section;

  @ManyToOne(() => Banner, (banner) => banner.products, { nullable: true })
  banner?: Banner;
}
