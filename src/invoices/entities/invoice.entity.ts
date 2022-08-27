import { Customer } from 'src/customers/entities/customer.entity';
import { InvoicesDetail } from 'src/invoices-details/entities/invoices-detail.entity';
import { Base } from 'src/utilities/classes/base.entity';

export class Invoice extends Base {
  customer: Customer;
  isAnulated: boolean;
  isCompleted: boolean;
  comment: string;
  invoiceDetails: InvoicesDetail[];
}
