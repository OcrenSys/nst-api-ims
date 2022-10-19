import { Credit } from '../../credits/entities/credit.entity';
import { Customer } from '../../customers/entities/customer.entity';
import { InvoicesDetail } from '../../invoices-details/entities/invoices-detail.entity';
import { Column, Entity, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { Base } from '../../../common/models/base.entity';
import { Member } from '../../../api/members/entities/member.entity';

@Entity()
export class Invoice extends Base {
  @Column()
  isAnulated: boolean;

  @Column()
  isCompleted: boolean;

  @Column({ nullable: true })
  comment: string;

  @OneToOne(() => Credit, (credit) => credit.invoice, {
    nullable: true,
    eager: true,
  })
  credit?: Credit;

  @OneToMany(() => InvoicesDetail, (invoicesDetail) => invoicesDetail.invoice, {
    cascade: true,
  })
  invoiceDetails?: InvoicesDetail[];

  @ManyToOne(() => Customer, (customer) => customer.invoices, {
    eager: true,
    nullable: true,
  })
  customer?: Customer;

  @ManyToOne(() => Member, (member) => member.invoices, { eager: true })
  member: Member;
}
