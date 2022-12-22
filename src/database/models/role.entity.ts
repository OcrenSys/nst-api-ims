import { Column, Entity, ManyToMany } from 'typeorm';
import { Base } from './base.entity';
import { RoleEnum } from '../../common/enums/roles.enum';
import { User } from './user.entity';

@Entity()
export class Role extends Base {
  @Column({ default: RoleEnum.User })
  name: RoleEnum;

  @ManyToMany(() => User, (user) => user.roles)
  users?: User[];
}
