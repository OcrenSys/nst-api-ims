import { Member } from '../../api/members/entities/member.entity';
import { PersonData } from './011_person.data';
import { UserData } from './013_user.data';

export const MemberData: Member[] = [
  {
    avatar: '',
    person: PersonData[0],
    user: UserData[0],
    isActive: true,
    createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
    updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
  },
  {
    avatar: '',
    person: PersonData[1],
    user: UserData[1],
    isActive: true,
    createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
    updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
  },
  {
    avatar: '',
    person: PersonData[2],
    user: UserData[2],
    isActive: true,
    createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
    updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
  },
];
