import { IsEmail, IsString } from 'class-validator';
import { RoleEnum } from '../enums/roles.enum';

export class User {
  id?: number;
  firstName?: string;
  lastName?: string;
  @IsEmail()
  email?: string;
  @IsString()
  password?: string;
  avatar?: string;
  role?: RoleEnum;
}
