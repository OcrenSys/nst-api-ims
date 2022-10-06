import { Entity, Column, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import { Category } from '../../categories/entities/category.entity';
import { Image } from '../../images/entities/image.entity';
import { Product } from '../../products/entities/product.entity';
import { Base } from '../../../common/models/base.entity';
import { SubCategory } from '../../sub-categories/entities/sub-category.entity';

@Entity()
export class Banner extends Base {
  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  createdAt: string;

  @Column()
  updatedAt: string;

  @Column({ default: false })
  isActive: boolean;

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
