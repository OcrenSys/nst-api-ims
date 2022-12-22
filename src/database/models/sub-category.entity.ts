import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { IsNumber } from 'class-validator';
import { Banner } from './banner.entity';
import { Image } from './image.entity';
import { Product } from './product.entity';
import { Base } from './base.entity';
import { Category } from './category.entity';

@Entity()
export class SubCategory extends Base {
  @Column()
  name: string;

  @Column({ nullable: true })
  description?: string;

 

  @Column({ default: 0 })
  @IsNumber()
  position: number;

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
