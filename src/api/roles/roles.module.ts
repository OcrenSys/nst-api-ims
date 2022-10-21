import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HandleExceptions } from '../..common/helpers/handle.exceptions';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { Role } from './entities/role.entity';
import { User } from '../users/entities/user.entity';

@Module({
  controllers: [RolesController],
  providers: [RolesService, HandleExceptions],
  imports: [TypeOrmModule.forFeature([Role, User])],
})
export class RolesModule {}
