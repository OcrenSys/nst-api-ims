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
import { Base } from './base.entity';
import { SubCategory } from './sub-category.entity';

@Entity()
export class Category extends Base {
  @Column()
  name: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ default: 0 })
  @IsNumber()
  position?: number;

  @OneToOne(() => Image, (image) => image.category, {
    nullable: true,
    eager: true,
  })
  @JoinColumn()
  image?: Image;

  @ManyToOne(() => Banner, (banner) => banner.categories, { nullable: true })
  banner?: Banner;

  @OneToMany(() => SubCategory, (subCategory) => subCategory.category, {
    nullable: true,
    eager: true,
  })
  subcategories?: SubCategory[];
}
