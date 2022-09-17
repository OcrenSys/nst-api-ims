import { Invoice } from 'src/invoices/entities/invoice.entity';
import { Base } from 'src/utilities/classes/Base.entity';
import { Column, Entity, OneToMany } from 'typeorm';

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

  @OneToMany(() => Invoice, (invoice) => invoice.customer)
  invoices: Invoice[];
}
