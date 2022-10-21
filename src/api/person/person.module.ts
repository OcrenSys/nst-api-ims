import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HandleExceptions } from '../..common/helpers/handle.exceptions';
import { PersonService } from './person.service';
import { PersonController } from './person.controller';
import { Person } from './entities/person.entity';
import { Member } from '../members/entities/member.entity';
import { Customer } from '../customers/entities/customer.entity';

@Module({
  controllers: [PersonController],
  providers: [PersonService, HandleExceptions],
  imports: [TypeOrmModule.forFeature([Person, Member, Customer])],
})
export class PersonModule {}
