import { Column, Entity, OneToMany } from 'typeorm';
import { Product } from '../../products/entities/product.entity';
import { Base } from '../../../common/models/base.entity';

@Entity()
export class Section extends Base {
  @Column()
  name: string;

  @OneToMany(() => Product, (product) => product.section, { nullable: true })
  products?: Product[];
}
