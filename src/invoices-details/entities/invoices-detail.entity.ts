import { Invoice } from 'src/invoices/entities/invoice.entity';
import { Product } from 'src/products/entities/product.entity';
import { Base } from 'src/utilities/classes/base.entity';
import { Variant } from 'src/variants/entities/variant.entity';

export class InvoicesDetail extends Base {
  price: number;
  cost: number;
  amount: number;
  invoice: Invoice;
  product: Product;
  variant: Variant;
}
