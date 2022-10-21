import {
  IsArray,
  IsObject,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Member } from '../../../api/members/entities/member.entity';
import { Role } from '../../../api/roles/entities/role.entity';
import { FirebaseUser } from '../../../common/models/firebase-user';
import * as NUMBER from '../../../common/constants/numbers.constants';

export class CreateUserDto {
  @IsString()
  @MaxLength(NUMBER.N50, {
    message: `El user id no puede ser mayor a ${NUMBER.N50} caracteres.`,
  })
  @MinLength(NUMBER.N02, {
    message: `El user id debe contener almenos ${NUMBER.N02} caracteres.`,
  })
  user_id: string;

  @IsObject()
  @IsOptional()
  member?: Member;

  @IsArray()
  @IsOptional()
  roles?: Role[];

  @IsObject()
  @IsOptional()
  firebaseUser?: FirebaseUser;
}
