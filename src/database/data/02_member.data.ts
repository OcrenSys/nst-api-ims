import { Member } from '../../api/members/entities/member.entity';
import { PersonData } from './01_person.data';
import { RoleData } from './01_role.data';

export const MemberData: Member[] = [
  {
    avatar: '',
    roles: [RoleData[0], RoleData[1], RoleData[2]],
    person: PersonData[0],
    isActive: true,
    createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
    updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
  },

  {
    avatar: '',
    roles: [RoleData[1]],
    person: PersonData[1],
    isActive: true,
    createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
    updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
  },
  {
    avatar: '',
    roles: [RoleData[2]],
    person: PersonData[2],
    isActive: true,
    createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
    updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
  },
];
