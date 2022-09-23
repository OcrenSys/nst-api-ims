import { Banner } from '../../banners/entities/banner.entity';
import { Category } from '../../categories/entities/category.entity';
import { Product } from '../../products/entities/product.entity';
import { Base } from '../../utilities/classes/Base.entity';
import { Variant } from '../../variants/entities/variant.entity';
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
