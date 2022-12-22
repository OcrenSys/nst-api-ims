import { Column, Entity, ManyToOne, OneToOne } from 'typeorm';
import { Banner } from './banner.entity';
import { Category } from './category.entity';
import { Product } from './product.entity';
import { Base } from './base.entity';
import { Variant } from './variant.entity';
import { SubCategory } from './sub-category.entity';

@Entity()
export class Image extends Base {
  @Column()
  url: string;

  @ManyToOne(() => Product, (product) => product.images, {
    onDelete: 'CASCADE',
  })
  product?: Product;

  @ManyToOne(() => Variant, (variant) => variant.images, { nullable: true })
  variant?: Variant;

  @OneToOne(() => Banner, (product) => product.image, { nullable: true })
  banner?: Banner;

  @OneToOne(() => Category, (category) => category.image, {
    nullable: true,
  })
  category?: Category;

  @OneToOne(() => SubCategory, (subCategory) => subCategory.image, {
    nullable: true,
  })
  subCategory?: SubCategory;
}
