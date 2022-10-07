import { Column, Entity, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import { Base } from '../../../common/models/base.entity';
import { Invoice } from '../../invoices/entities/invoice.entity';
import { Person } from '../../person/entities/person.entity';

@Entity()
export class Customer extends Base {
  @Column({ nullable: true })
  avatar: string;

  @Column({ default: 1 })
  order: number;

  @Column({ default: 0 })
  limit: number;

  @OneToMany(() => Invoice, (invoice) => invoice.customer, { nullable: true })
  invoices?: Invoice[];

  @OneToOne(() => Person, (person) => person.customer)
  @JoinColumn()
  person: Person;
}
