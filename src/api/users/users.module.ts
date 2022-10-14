import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { HandleExceptions } from 'src/common/helpers/handle.exceptions';
import { Member } from '../members/entities/member.entity';
import { Role } from '../roles/entities/role.entity';
import { FirebaseUser } from 'src/common/models/firebase-user';

@Module({
  controllers: [UsersController],
  providers: [UsersService, HandleExceptions],
  exports: [UsersService],
  imports: [TypeOrmModule.forFeature([User, Member, Role, FirebaseUser])],
})
export class UsersModule {}
