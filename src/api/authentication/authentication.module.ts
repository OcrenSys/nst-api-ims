import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { UsersService } from '../users/users.service';
import { UsersModule } from '../users/users.module';
import { FirebaseUser } from 'src/common/models/firebase-user';
import { Member } from '../members/entities/member.entity';
import { Role } from '../roles/entities/role.entity';
import { User } from '../users/entities/user.entity';
import { HandleExceptions } from '../../common/helpers/handle.exceptions';

@Module({
  controllers: [AuthenticationController],
  providers: [AuthenticationService, UsersService, JwtStrategy, HandleExceptions],
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.SECRET_JWT,
      signOptions: { expiresIn: '5h' },
    }),
    TypeOrmModule.forFeature([User, Member, Role, FirebaseUser]),
  ],
  exports: [AuthenticationService],
})
export class AuthenticationModule {}
