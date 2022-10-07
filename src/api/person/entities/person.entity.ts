import { Column, Entity, OneToOne } from 'typeorm';
import { Customer } from '../../customers/entities/customer.entity';
import { Member } from '../../members/entities/member.entity';
import { Base } from '../../../common/models/base.entity';

@Entity()
export class Person extends Base {
  @Column()
  nickName: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  address: string;

  @OneToOne(() => Customer, (customer) => customer.person)
  customer?: Customer;

  @OneToOne(() => Member, (member) => member.person)
  member?: Member;
}
