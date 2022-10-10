import { Banner } from '../../banners/entities/banner.entity';
import { Image } from '../../images/entities/image.entity';
import { Product } from '../../products/entities/product.entity';
import { Base } from '../../../common/models/base.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { Category } from '../../categories/entities/category.entity';
import { IsNumber } from 'class-validator';

@Entity()
export class SubCategory extends Base {
  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ default: 0 })
  @IsNumber()
  order: number;

  @OneToOne(() => Image, (image) => image.subCategory)
  @JoinColumn()
  image: Image;

  @ManyToOne(() => Banner, (banner) => banner.subCategories)
  banner: Banner;

  @OneToMany(() => Product, (product) => product.subCategory)
  products: Product[];

  @ManyToOne(() => Category, (category) => category.subcategories)
  category: Category;
}