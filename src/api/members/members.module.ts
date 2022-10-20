import { Module } from '@nestjs/common';
import { MembersService } from './members.service';
import { MembersController } from './members.controller';
import { Invoice } from '../invoices/entities/invoice.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HandleExceptions } from 'src/common/helpers/handle.exceptions';
import { Person } from '../person/entities/person.entity';
import { User } from '../users/entities/user.entity';
import { Member } from './entities/member.entity';

@Module({
  controllers: [MembersController],
  providers: [MembersService, HandleExceptions],
  imports: [TypeOrmModule.forFeature([Member, User, Person, Invoice])],
})
export class MembersModule {}
