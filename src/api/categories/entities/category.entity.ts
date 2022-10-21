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
import { Base } from '../../../common/models/base.entity';
import { SubCategory } from '../../sub-categories/entities/sub-category.entity';

@Entity()
export class Category extends Base {
  @Column()
  name: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ default: 0 })
  @IsNumber()
  order?: number;

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
