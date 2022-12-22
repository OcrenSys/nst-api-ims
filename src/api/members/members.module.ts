import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HandleExceptions } from '../../common/helpers/handle.exceptions';
import { MembersService } from './members.service';
import { MembersController } from './members.controller';
import { Order } from '../../database/models/order.entity';
import { Person } from '../../database/models/person.entity';
import { User } from '../../database/models/user.entity';
import { Member } from '../../database/models/member.entity';

@Module({
  controllers: [MembersController],
  providers: [MembersService, HandleExceptions],
  imports: [TypeOrmModule.forFeature([Member, User, Person, Order])],
})
export class MembersModule {}
