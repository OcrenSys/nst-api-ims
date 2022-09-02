import { Product } from 'src/products/entities/product.entity';
import { Variant } from 'src/variants/entities/variant.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Brand {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  description: string;
  @OneToMany(() => Product, (product) => product.brand)
  products: Product[];
  @OneToMany(() => Variant, (variant) => variant.brand)
  variants: Variant[];
}
