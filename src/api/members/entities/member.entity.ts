import { Column, Entity, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { Person } from '../../person/entities/person.entity';
import { Base } from '../../../common/models/base.entity';
import { User } from '../../users/entities/user.entity';
import { Invoice } from '../../../api/invoices/entities/invoice.entity';

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

  @OneToMany(() => Invoice, (invoice) => invoice.customer, {
    nullable: true,
  })
  invoices?: Invoice[];
}
