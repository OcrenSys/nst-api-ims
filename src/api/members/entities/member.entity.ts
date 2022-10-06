import { Column, Entity, OneToOne, JoinColumn } from 'typeorm';
import { Person } from '../../person/entities/person.entity';
import { Base } from '../../../common/models/base.entity';
import { User } from '../../users/entities/user.entity';

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
}
