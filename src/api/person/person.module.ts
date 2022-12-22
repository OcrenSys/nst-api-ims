import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HandleExceptions } from '../../common/helpers/handle.exceptions';
import { PersonService } from './person.service';
import { PersonController } from './person.controller';
import { Person } from '../../database/models/person.entity';
import { Member } from '../../database/models/member.entity';
import { Customer } from '../../database/models/customer.entity';

@Module({
  controllers: [PersonController],
  providers: [PersonService, HandleExceptions],
  imports: [TypeOrmModule.forFeature([Person, Member, Customer])],
})
export class PersonModule {}
