import { Entity, Column, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import { Category } from './category.entity';
import { Image } from './image.entity';
import { Product } from './product.entity';
import { Base } from './base.entity';
import { SubCategory } from './sub-category.entity';

@Entity()
export class Banner extends Base {
  @Column()
  name: string;

  @Column({ nullable: true })
  description?: string;

  @OneToOne(() => Image, (image) => image.banner, { nullable: true })
  @JoinColumn()
  image?: Image;

  @OneToMany(() => Product, (product) => product.banner, { nullable: true })
  products?: Product[];

  @OneToMany(() => Category, (category) => category.banner, { nullable: true })
  categories?: Category[];

  @OneToMany(() => SubCategory, (subCategory) => subCategory.banner, {
    nullable: true,
  })
  subCategories?: SubCategory[];
}
