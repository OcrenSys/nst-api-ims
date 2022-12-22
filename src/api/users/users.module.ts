import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HandleExceptions } from '../../common/helpers/handle.exceptions';
import { FirebaseUser } from '../../common/models/firebase-user';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from '../../database/models/user.entity';
import { Member } from '../../database/models/member.entity';
import { Role } from '../../database/models/role.entity';

@Module({
  controllers: [UsersController],
  providers: [UsersService, HandleExceptions],
  exports: [UsersService],
  imports: [TypeOrmModule.forFeature([User, Member, Role, FirebaseUser])],
})
export class UsersModule {}
