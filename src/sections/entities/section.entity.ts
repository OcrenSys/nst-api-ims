import { Product } from 'src/products/entities/product.entity';
import { Base } from 'src/utilities/classes/base.entity';

export class Section extends Base {
  name: string;
  products: Product[];
}
