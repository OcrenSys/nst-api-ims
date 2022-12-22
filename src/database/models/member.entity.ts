import { Column, Entity, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { Person } from './person.entity';
import { Base } from './base.entity';
import { User } from './user.entity';
import { Order } from './order.entity';

@Entity()
export class Member extends Base {
  @Column({ nullable: true, default: null })
  avatar: string;

  @OneToOne(() => User, (user) => user.member)
  @JoinColumn()
  user: User;

  @OneToOne(() => Person, (person) => person.customer)
  @JoinColumn()
  person: Person;

  @OneToMany(() => Order, (invoice) => invoice.customer, {
    nullable: true,
  })
  orders?: Order[];
}
