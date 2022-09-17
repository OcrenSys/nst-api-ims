import { Banner } from 'src/banners/entities/banner.entity';
import { Category } from 'src/categories/entities/category.entity';
import { Product } from 'src/products/entities/product.entity';
import { Base } from 'src/utilities/classes/Base.entity';
import { Variant } from 'src/variants/entities/variant.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity()
export class Image extends Base {
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
