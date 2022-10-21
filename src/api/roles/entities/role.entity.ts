import { Column, Entity, ManyToMany } from 'typeorm';
import { Base } from '../../../common/models/base.entity';
import { RoleEnum } from '../../../common/enums/roles.enum';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Role extends Base {
  @Column({ default: RoleEnum.User })
  name: RoleEnum;

  @ManyToMany(() => User, (user) => user.roles)
  users?: User[];
}
