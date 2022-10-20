import { IsArray, IsOptional, IsString } from 'class-validator';
import { User } from '../../../api/users/entities/user.entity';
import { RoleEnum } from '../../../common/enums/roles.enum';

export class CreateRoleDto {
  @IsString()
  name: RoleEnum;

  @IsArray()
  @IsOptional()
  users?: User[];
}
