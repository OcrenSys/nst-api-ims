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
import { Banner } from '../../banners/entities/banner.entity';
import { Brand } from '../../brands/entities/brand.entity';
import { Image } from '../../images/entities/image.entity';
import { InvoicesDetail } from '../../invoices-details/entities/invoices-detail.entity';
import { Section } from '../../sections/entities/section.entity';
import { Variant } from '../../variants/entities/variant.entity';
import { Base } from '../../../common/models/base.entity';
import { SubCategory } from '../../sub-categories/entities/sub-category.entity';
import { MAX, MIN } from '../../../common/constants/numbers.constants';

@Entity()
export class Product extends Base {
  @Column({ unique: true })
  @Length(3, 30)
  code: string;

  @Column()
  @IsString()
  @MaxLength(50, {
    message: `El nombre de producto no puede ser mayor a ${50} caracteres.`,
  })
  @MinLength(2, {
    message: `El noombre de producto debe contener almenos ${2} caracteres.`,
  })
  name: string;

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

  @Column({ nullable: true })
  @IsString()
  @Length(MIN, 200)
  description?: string;

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
  order: number;

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

  @OneToOne(() => InvoicesDetail, (invoiceDetails) => invoiceDetails.product, {
    nullable: true,
  })
  invoiceDetail?: InvoicesDetail;

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
