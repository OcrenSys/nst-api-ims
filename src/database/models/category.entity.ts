import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { IsNumber, MaxLength, MinLength } from 'class-validator';
import { Banner } from './banner.entity';
import { Image } from './image.entity';
import { Base } from './base.entity';
import { SubCategory } from './sub-category.entity';
import * as NUMBER from '../../common/constants/numbers.constants';

@Entity()
export class Category extends Base {
  @Column({ nullable: false, length: NUMBER.N50 })
  @MaxLength(NUMBER.N50, {
    message: `Category name must contain less than ${NUMBER.N100}`,
  })
  @MinLength(NUMBER.N00, {
    message: `Category name must not be empty.`,
  })
  name: string;

  @Column({ nullable: true })
  @MaxLength(NUMBER.N100, {
    message: `Category description must contain less than ${NUMBER.N100}`,
  })
  @MinLength(NUMBER.N00, {
    message: `Category description must not be empty.`,
  })
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
  })
  subCategories?: SubCategory[];
}
