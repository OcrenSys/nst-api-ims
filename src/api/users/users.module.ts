import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HandleExceptions } from '../..common/helpers/handle.exceptions';
import { FirebaseUser } from '../..common/models/firebase-user';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import { Member } from '../members/entities/member.entity';
import { Role } from '../roles/entities/role.entity';

@Module({
  controllers: [UsersController],
  providers: [UsersService, HandleExceptions],
  exports: [UsersService],
  imports: [TypeOrmModule.forFeature([User, Member, Role, FirebaseUser])],
})
export class UsersModule {}
