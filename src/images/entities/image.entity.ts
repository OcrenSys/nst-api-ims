import { Banner } from 'src/banners/entities/banner.entity';
import { Category } from 'src/categories/entities/category.entity';
import { Product } from 'src/products/entities/product.entity';
import { Base } from 'src/utilities/classes/base.entity';
import { Variant } from 'src/variants/entities/variant.entity';

export class Image extends Base {
  url: string;
  product: Product;
  category: Category;
  variant: Variant;
  banner: Banner;
}
