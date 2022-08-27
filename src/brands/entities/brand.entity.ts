import { Product } from 'src/products/entities/product.entity';
import { Base } from 'src/utilities/classes/base.entity';
import { Variant } from 'src/variants/entities/variant.entity';

export class Brand extends Base {
  name: string;
  description: string;
  product: Product;
  variant: Variant;
}
