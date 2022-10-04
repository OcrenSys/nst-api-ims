import { IsEmail, IsString } from 'class-validator';
import { Column, Entity, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import { Person } from '../../person/entities/person.entity';
import { Role } from '../../roles/entities/role.entity';
import { Base } from '../../../common/models/base.entity';

@Entity()
export class Member extends Base {
  @Column({ nullable: true, default: null })
  @IsEmail()
  email?: string;

  @Column({ nullable: true, default: null })
  @IsString()
  password?: string;

  @Column({ nullable: true, default: null })
  avatar: string;

  @OneToMany(() => Role, (role) => role.member)
  roles?: Role[];

  @OneToOne(() => Person, (person) => person.customer)
  @JoinColumn()
  person: Person;
}
