import { Image } from 'src/images/entities/image.entity';
import { Base } from 'src/utilities/classes/base.entity';
import { Variant } from 'src/variants/entities/variant.entity';

export class Product extends Base {
  code: string;
  name: string;
  price: number;
  price_credit: number;
  cost: number;
  description: string;
  stock: number;
  images: Image[];
  order: number;

  variants: Variant;
  //   creditDetails: CreditDetails;
  //   category: Category;
  //   section: Section;
  //   banner: Banner;
}
