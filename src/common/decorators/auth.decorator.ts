import { SetMetadata } from '@nestjs/common';

import { RoleEnum } from '../enums/roles.enum';

export const ROLES_KEY = 'roles';
export const Auth = (...roles: RoleEnum[]) => SetMetadata(ROLES_KEY, roles);
