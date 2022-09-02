import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

import { Category } from 'src/categories/entities/category.entity';
import { Image } from 'src/images/entities/image.entity';
import { Product } from 'src/products/entities/product.entity';

@Entity()
export class Banner {
  @PrimaryGeneratedColumn()
  id: number;
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
