import {
  IsObject,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import * as NUMBER from '../../../common/constants/numbers.constants';
import { Customer } from '../../../database/models/customer.entity';
import { Member } from '../../../database/models/member.entity';

export class CreatePersonDto {
  @IsString()
  @IsOptional()
  @MaxLength(NUMBER.N50, {
    message: `El apodo de la persona no puede ser mayor a ${NUMBER.N50} caracteres.`,
  })
  @MinLength(NUMBER.N02, {
    message: `El apodo de la persona debe contener almenos ${NUMBER.N02} caracteres.`,
  })
  nickName?: string;

  @IsString()
  @IsOptional()
  @MaxLength(NUMBER.N50, {
    message: `El nombre de la persona no puede ser mayor a ${NUMBER.N50} caracteres.`,
  })
  @MinLength(NUMBER.N02, {
    message: `El nombre de la persona debe contener almenos ${NUMBER.N02} caracteres.`,
  })
  firstName?: string;

  @IsString()
  @IsOptional()
  @MaxLength(NUMBER.N50, {
    message: `El apellido de la persona no puede ser mayor a ${NUMBER.N50} caracteres.`,
  })
  @MinLength(NUMBER.N02, {
    message: `El apellido de la persona debe contener almenos ${NUMBER.N02} caracteres.`,
  })
  lastName?: string;

  phone?: string;

  @IsString()
  @IsOptional()
  @MaxLength(NUMBER.N50, {
    message: `La direccion de la persona no puede ser mayor a ${NUMBER.N50} caracteres.`,
  })
  @MinLength(NUMBER.N02, {
    message: `La direccion de la persona debe contener almenos ${NUMBER.N02} caracteres.`,
  })
  address?: string;

  @IsOptional()
  @IsObject()
  customer?: Customer;

  @IsOptional()
  @IsObject()
  member?: Member;
}
