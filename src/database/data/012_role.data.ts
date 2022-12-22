import { RoleEnum } from '../../common/enums/roles.enum';
import { Role } from '../models/role.entity';

export const RoleData: Role[] = [
  {
    name: RoleEnum.Admin,
  },
  {
    name: RoleEnum.Sales,
  },
  {
    name: RoleEnum.User,
  },
];
