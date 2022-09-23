import { Entity, Column, OneToMany } from 'typeorm';
import { Category } from '../../categories/entities/category.entity';
import { Image } from '../../images/entities/image.entity';
import { Product } from '../../products/entities/product.entity';
import { Base } from '../../utilities/classes/Base.entity';

@Entity()
export class Banner extends Base {
  @Column()
  name: string;
  @Column()
  description: string;
  @Column()
  createdAt: string;
  @Column()
  updatedAt: string;
  @Column()
  isActive: boolean;
  @OneToMany(() => Image, (image) => image.banner)
  images: Image[];
  @OneToMany(() => Product, (product) => product.banner)
  products: Product[];
  @OneToMany(() => Category, (category) => category.banner)
  categories: Category[];
}
