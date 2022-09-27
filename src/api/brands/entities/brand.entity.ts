import { Product } from '../../products/entities/product.entity';
import { Base } from '../../../utilities/classes/base.entity';
import { Variant } from '../../variants/entities/variant.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class Brand extends Base {
  @Column()
  name: string;
  @Column()
  description: string;
  @OneToMany(() => Product, (product) => product.brand)
  products: Product[];
  @OneToMany(() => Variant, (variant) => variant.brand)
  variants: Variant[];
}
