import { IsArray, IsObject, IsOptional, IsString } from 'class-validator';
import { Invoice } from '../../../api/invoices/entities/invoice.entity';
import { Person } from '../../../api/person/entities/person.entity';
import { User } from '../../../api/users/entities/user.entity';

export class CreateMemberDto {
  @IsString()
  avatar: string;

  @IsObject()
  user: User;

  @IsObject()
  person: Person;

  @IsArray()
  @IsOptional()
  invoices?: Invoice[];
}
