import { Banner } from 'src/banners/entities/banner.entity';
import { Image } from 'src/images/entities/image.entity';
import { Product } from 'src/products/entities/product.entity';
import { Base } from 'src/utilities/classes/Base.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class Category extends Base {
  @Column()
  code: string;
  @Column()
  name: string;
  @Column()
  description: string;
  @Column()
  order: number;
  @OneToMany(() => Image, (image) => image.variant)
  images: Image[];
  @ManyToOne(() => Banner, (banner) => banner.categories)
  banner: Banner;
  @OneToMany(() => Product, (product) => product.category)
  products: Product[];
}
