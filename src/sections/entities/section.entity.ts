import { Product } from 'src/products/entities/product.entity';
import { Base } from 'src/utilities/classes/Base.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class Section extends Base {
  @Column()
  name: string;
  @OneToMany(() => Product, (product) => product.section)
  products: Product[];
}
