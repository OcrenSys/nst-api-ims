import { Invoice } from 'src/invoices/entities/invoice.entity';
import { Product } from 'src/products/entities/product.entity';
import { Variant } from 'src/variants/entities/variant.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class InvoicesDetail {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  price: number;
  @Column()
  cost: number;
  @Column()
  amount: number;
  @ManyToOne(() => Invoice, (invoice) => invoice.invoiceDetails)
  invoice: Invoice;
  @OneToOne(() => Product, (product) => product.invoiceDetail)
  @JoinColumn()
  product: Product;
  @OneToOne(() => Variant, (variant) => variant.invoiceDetail)
  @JoinColumn()
  variant: Variant;
}