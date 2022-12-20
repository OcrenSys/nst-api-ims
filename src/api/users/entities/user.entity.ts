import { Column, Entity, ManyToMany, JoinTable, OneToOne } from 'typeorm';
import { Role } from '../../roles/entities/role.entity';
import { Base } from '../../../common/models/base.entity';
import { Member } from '../../members/entities/member.entity';
import { FirebaseUser } from '../../../common/models/firebase-user';

@Entity()
export class User extends Base {
  @Column()
  user_id: string;

  @Column({ nullable: true })
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  webToken: string;

  @OneToOne(() => Member, (member) => member.user, { eager: true })
  member?: Member;

  @ManyToMany(() => Role, (role) => role.users)
  @JoinTable()
  roles?: Role[];

  firebaseUser?: FirebaseUser;
}
