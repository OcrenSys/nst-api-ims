import { IsArray, IsObject, IsOptional, IsString } from 'class-validator';
import { Order } from '../../../database/models/order.entity';
import { Person } from '../../../database/models/person.entity';
import { User } from '../../../database/models/user.entity';

export class CreateMemberDto {
  @IsString()
  avatar: string;

  @IsObject()
  user: User;

  @IsObject()
  person: Person;

  @IsArray()
  @IsOptional()
  orders?: Order[];
}
