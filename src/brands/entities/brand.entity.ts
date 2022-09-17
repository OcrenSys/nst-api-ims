import { Product } from 'src/products/entities/product.entity';
import { Base } from 'src/utilities/classes/Base.entity';
import { Variant } from 'src/variants/entities/variant.entity';
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
