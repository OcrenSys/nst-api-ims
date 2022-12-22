import { Column, Entity, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import {
  IsBoolean,
  IsInt,
  IsNumber,
  IsString,
  Length,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { Banner } from './banner.entity';
import { Brand } from './brand.entity';
import { Image } from './image.entity';
import { OrderDetail } from './order-detail.entity';
import { Section } from './section.entity';
import { Variant } from './variant.entity';
import { Base } from './base.entity';
import { SubCategory } from './sub-category.entity';
import { MAX, MIN } from '../../common/constants/numbers.constants';

@Entity()
export class Product extends Base {
  @Column({ unique: true })
  @Length(3, 30)
  code: string;

  @Column({ nullable: true })
  @IsString()
  @Length(MIN, 200)
  description?: string;

  @Column()
  @IsNumber()
  @Min(MIN, {
    message: `El precio del producto debe ser un numero entero mayor o igual a ${MIN}`,
  })
  @Max(MAX, {
    message: `El precio del producto debe ser un monto real, menor a ${MAX}`,
  })
  price: number;

  @Column()
  @IsNumber()
  @Min(MIN, {
    message: `El precio de credito del producto debe ser un numero entero mayor o igual a ${MIN}`,
  })
  @Max(MAX, {
    message: `El precio de credito del producto debe ser un monto real, menor a ${MAX}`,
  })
  priceCredit: number;

  @Column()
  @IsNumber()
  @Min(MIN, {
    message: `El costo del producto debe ser un numero entero mayor o igual a ${MIN}`,
  })
  @Max(MAX, {
    message: `El costo del producto debe ser un monto real, menor a ${MAX}`,
  })
  cost: number;

  @Column()
  @IsInt()
  @Min(MIN, {
    message: `El stock del producto debe ser un numero entero mayor o igual a ${MIN}`,
  })
  @Max(MAX, {
    message: `El stock del producto debe ser un monto real, menor a ${MAX}`,
  })
  stock: number;

  @Column({ default: 0 })
  @IsInt()
  @Min(MIN)
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

  @OneToOne(() => OrderDetail, (invoiceDetails) => invoiceDetails.product, {
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
