import { Image } from 'src/images/entities/image.entity';
import { Product } from 'src/products/entities/product.entity';
import { Base } from 'src/utilities/classes/base.entity';

export class Category extends Base {
  code: string;
  name: string;
  description: string;
  products: Product[];
  order: number;
  image: Image[];

  // banner: Banner;
}
