import { Banner } from 'src/banners/entities/banner.entity';
import { Category } from 'src/categories/entities/category.entity';
import { Product } from 'src/products/entities/product.entity';
import { Variant } from 'src/variants/entities/variant.entity';
import { Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

export class Image {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  url: string;
  @ManyToOne(() => Product, (product) => product.images)
  product: Product;
  @ManyToOne(() => Category, (category) => category.images)
  category: Category;
  @ManyToOne(() => Variant, (variant) => variant.images)
  variant: Variant;
  @ManyToOne(() => Banner, (product) => product.images)
  banner: Banner;
}
