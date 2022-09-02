import { Product } from 'src/products/entities/product.entity';
import { Column, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

export class Section {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @OneToOne(() => Product, (product) => product.section)
  products: Product[];
}
