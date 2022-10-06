import { RoleEnum } from '../../common/enums/roles.enum';
import { Role } from '../../api/roles/entities/role.entity';
// import { UserData } from './013_user.data';

export const RoleData: Role[] = [
  {
    name: RoleEnum.Admin,
    // users: [UserData[0]],
    isActive: true,
    createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
    updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
  },
  {
    name: RoleEnum.Sales,
    // users: [UserData[0], UserData[1]],
    isActive: true,
    createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
    updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
  },
  {
    name: RoleEnum.User,
    // users: [UserData[2], UserData[3]],
    isActive: true,
    createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
    updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
  },
];
