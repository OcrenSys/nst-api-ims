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
import { SubCategory } from '../../sub-categories/entities/sub-category.entity';
import { IsNumber } from 'class-validator';

@Entity()
export class Category extends Base {
  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ default: 0 })
  @IsNumber()
  order: number;

  @OneToOne(() => Image, (image) => image.category, { nullable: true })
  @JoinColumn()
  image: Image;

  @ManyToOne(() => Banner, (banner) => banner.categories)
  banner?: Banner;

  @OneToMany(() => Product, (product) => product.category)
  products?: Product[];

  @OneToMany(() => SubCategory, (subCategory) => subCategory.category)
  subcategories?: SubCategory[];
}
