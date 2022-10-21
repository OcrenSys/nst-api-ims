import { Column, Entity, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import { Invoice } from '../../invoices/entities/invoice.entity';
import { Product } from '../../products/entities/product.entity';
import { Base } from '../../../common/models/base.entity';
import { Variant } from '../../variants/entities/variant.entity';

@Entity()
export class InvoicesDetail extends Base {
  @Column()
  price: number;

  @Column()
  cost: number;

  @Column()
  amount: number;

  @ManyToOne(() => Invoice, (invoice) => invoice.invoiceDetails, {
    onDelete: 'CASCADE',
  })
  invoice: Invoice;

  @OneToOne(() => Product, (product) => product.invoiceDetail, {
    eager: true,
  })
  @JoinColumn()
  product: Product;

  @OneToOne(() => Variant, (variant) => variant.invoiceDetail, {
    nullable: true,
    eager: true,
  })
  @JoinColumn()
  variant?: Variant;
}
