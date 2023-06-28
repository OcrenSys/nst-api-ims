import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { UsersService } from '../users/users.service';
import { FirebaseUser } from '../../common/models/firebase-user';
import { Member } from '../../database/models/member.entity';
import { Role } from '../../database/models/role.entity';
import { User } from '../../database/models/user.entity';
import { HandleExceptions } from '../../common/helpers/handle.exceptions';

@Module({
  controllers: [AuthenticationController],
  providers: [
    AuthenticationService,
    UsersService,
    JwtStrategy,
    HandleExceptions,
  ],
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
