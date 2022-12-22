import { Column, Entity, OneToOne } from 'typeorm';
import { Customer } from './customer.entity';
import { Member } from './member.entity';
import { Base } from './base.entity';

@Entity()
export class Person extends Base {
  @Column({ nullable: true })
  nickName?: string;

  @Column({ nullable: true })
  firstName?: string;

  @Column({ nullable: true })
  lastName?: string;

  @Column({ nullable: true })
  phone?: string;

  @Column({ nullable: true })
  address?: string;

  @OneToOne(() => Customer, (customer) => customer.person, {
    eager: true,
    nullable: true,
    onDelete: 'CASCADE',
  })
  customer?: Customer;

  @OneToOne(() => Member, (member) => member.person, {
    eager: true,
    nullable: true,
    onDelete: 'CASCADE',
  })
  member?: Member;
}
