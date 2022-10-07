import { Credit } from '../../credits/entities/credit.entity';
import { Customer } from '../../customers/entities/customer.entity';
import { InvoicesDetail } from '../../invoices-details/entities/invoices-detail.entity';
import { Column, Entity, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { Base } from '../../../common/models/base.entity';

@Entity()
export class Invoice extends Base {
  @Column()
  isAnulated: boolean;

  @Column()
  isCompleted: boolean;

  @Column()
  comment: string;

  @OneToOne(() => Credit, (credit) => credit.invoice, { nullable: true })
  credit?: Credit;

  @OneToMany(() => InvoicesDetail, (invoicesDetail) => invoicesDetail.invoice, {
    nullable: true,
  })
  invoiceDetails?: InvoicesDetail[];

  @ManyToOne(() => Customer, (customer) => customer.invoices)
  customer: Customer;
}
