import { Column, Entity, OneToMany } from 'typeorm';
import { Product } from './product.entity';
import { Base } from './base.entity';

@Entity()
export class Section extends Base {
  @Column()
  name: string;

  @OneToMany(() => Product, (product) => product.section, { nullable: true })
  products?: Product[];
}
