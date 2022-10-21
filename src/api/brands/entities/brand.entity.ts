import { Column, Entity, OneToMany } from 'typeorm';
import { Product } from '../../products/entities/product.entity';
import { Base } from '../../../common/models/base.entity';

@Entity()
export class Brand extends Base {
  @Column()
  name: string;

  @Column({ nullable: true })
  description?: string;

  @OneToMany(() => Product, (product) => product.brand, {
    nullable: true,
  })
  products?: Product[];
}
