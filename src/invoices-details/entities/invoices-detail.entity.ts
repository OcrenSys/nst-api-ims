import { Invoice } from '../../invoices/entities/invoice.entity';
import { Product } from '../../products/entities/product.entity';
import { Base } from '../../utilities/classes/Base.entity';
import { Variant } from '../../variants/entities/variant.entity';
import { Column, Entity, ManyToOne, OneToOne, JoinColumn } from 'typeorm';

@Entity()
export class InvoicesDetail extends Base {
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
