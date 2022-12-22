import { Column, Entity, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import { Base } from './base.entity';
import { Order } from './order.entity';
import { Person } from './person.entity';

@Entity()
export class Customer extends Base {
  @Column({ nullable: true })
  avatar: string;

  @Column({ nullable: true })
  status?: string;

  @Column({ default: 1 })
  position: number;

  @Column({ default: 0 })
  limit: number;

  @OneToMany(() => Order, (invoice) => invoice.customer, { nullable: true })
  orders?: Order[];

  @OneToOne(() => Person, (person) => person.customer)
  @JoinColumn()
  person: Person;
}
