import { Module } from '@nestjs/common';
import { PersonService } from './person.service';
import { PersonController } from './person.controller';
import { Person } from './entities/person.entity';
import { Member } from '../members/entities/member.entity';
import { Customer } from '../customers/entities/customer.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HandleExceptions } from 'src/common/helpers/handle.exceptions';

@Module({
  controllers: [PersonController],
  providers: [PersonService, HandleExceptions],
  imports: [TypeOrmModule.forFeature([Person, Member, Customer])],
})
export class PersonModule {}
