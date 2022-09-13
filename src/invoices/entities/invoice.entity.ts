import { Credit } from 'src/credits/entities/credit.entity';
import { Customer } from 'src/customers/entities/customer.entity';
import { InvoicesDetail } from 'src/invoices-details/entities/invoices-detail.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Invoice {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  isAnulated: boolean;
  @Column()
  isCompleted: boolean;
  @Column()
  comment: string;
  @OneToOne(() => Credit, (credit) => credit.invoice)
  credit: Credit;
  @OneToMany(() => InvoicesDetail, (invoicesDetail) => invoicesDetail.invoice)
  invoiceDetails: InvoicesDetail[];
  @ManyToOne(() => Customer, (customer) => customer.invoices)
  customer: Customer;
}
