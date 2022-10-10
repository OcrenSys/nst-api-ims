import { Banner } from '../../banners/entities/banner.entity';
import { Category } from '../../categories/entities/category.entity';
import { Product } from '../../products/entities/product.entity';
import { Base } from '../../../common/models/base.entity';
import { Variant } from '../../variants/entities/variant.entity';
import { Column, Entity, ManyToOne, OneToOne } from 'typeorm';
import { SubCategory } from '../../sub-categories/entities/sub-category.entity';

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
