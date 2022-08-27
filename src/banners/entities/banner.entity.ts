import { Category } from 'src/categories/entities/category.entity';
import { Image } from 'src/images/entities/image.entity';
import { Product } from 'src/products/entities/product.entity';
import { Base } from 'src/utilities/classes/base.entity';

export class Banner extends Base {
  name: string;
  description: string;
  images: Image[];
  product: Product;
  category: Category;
}
