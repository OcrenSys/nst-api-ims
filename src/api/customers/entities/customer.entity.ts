import { Invoice } from '../../invoices/entities/invoice.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { Base } from '../../base/base.entity';

@Entity()
export class Customer extends Base {
  @Column()
  nickName: string;

  @Column()
  name: string;

  @Column()
  lastName: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  address: string;

  @Column({ default: 1 })
  order: number;

  @Column({ nullable: true })
  avatar: string;

  @Column({ default: 0 })
  limit: number;

  @OneToMany(() => Invoice, (invoice) => invoice.customer, { nullable: true })
  invoices?: Invoice[];
}
