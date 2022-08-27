import { Image } from 'src/images/entities/image.entity';
import { Product } from 'src/products/entities/product.entity';
import { Base } from 'src/utilities/classes/base.entity';

export class Variant extends Base {
  code: string;
  name: string;
  description: string;
  price: number;
  priceCredit: number;
  cost: number;
  stock: number;
  order: number;
  images: Image[];
  product: Product;
}
