import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { IsNumber } from 'class-validator';
import { Banner } from '../../banners/entities/banner.entity';
import { Image } from '../../images/entities/image.entity';
import { Product } from '../../products/entities/product.entity';
import { Base } from '../../../common/models/base.entity';
import { Category } from '../../categories/entities/category.entity';

@Entity()
export class SubCategory extends Base {
  @Column()
  name: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ default: 0 })
  @IsNumber()
  order: number;

  @OneToOne(() => Image, (image) => image.subCategory, { nullable: true })
  @JoinColumn()
  image?: Image;

  @ManyToOne(() => Banner, (banner) => banner.subCategories, { nullable: true })
  banner?: Banner;

  @OneToMany(() => Product, (product) => product.subCategory, { eager: true })
  products?: Product[];

  @ManyToOne(() => Category, (category) => category.subcategories)
  category: Category;
}
