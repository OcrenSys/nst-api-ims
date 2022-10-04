import { Column, Entity, ManyToOne } from 'typeorm';
import { Base } from '../../../common/models/base.entity';
import { Member } from '../../members/entities/member.entity';
import { RoleEnum } from '../../../common/enums/roles.enum';

@Entity()
export class Role extends Base {
  @Column({ default: RoleEnum.User })
  name: RoleEnum;

  @ManyToOne(() => Member, (member) => member.roles, { nullable: true })
  member?: Member;
}
