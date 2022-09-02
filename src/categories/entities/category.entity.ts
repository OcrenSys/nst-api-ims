import { Banner } from 'src/banners/entities/banner.entity';
import { Image } from 'src/images/entities/image.entity';
import { Product } from 'src/products/entities/product.entity';
import { Column, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

export class Category {
  @PrimaryGeneratedColumn()
  id: number;
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
