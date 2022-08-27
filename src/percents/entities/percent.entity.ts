import { Invoice } from 'src/invoices/entities/invoice.entity';
import { Base } from 'src/utilities/classes/base.entity';

export class Percent extends Base {
  fee: number;
  rate: number;
  invoice: Invoice;
}
