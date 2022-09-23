import { Product } from '../../products/entities/product.entity';
import { Base } from '../../utilities/classes/Base.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class Section extends Base {
  @Column()
  name: string;
  @OneToMany(() => Product, (product) => product.section)
  products: Product[];
}
