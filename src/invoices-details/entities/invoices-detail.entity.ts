import { Invoice } from 'src/invoices/entities/invoice.entity';
import { Product } from 'src/products/entities/product.entity';
import { Variant } from 'src/variants/entities/variant.entity';
import { Column, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

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
  product: Product;
  @OneToOne(() => Variant, (variant) => variant.invoiceDetail)
  variant: Variant;
}
