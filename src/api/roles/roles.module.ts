import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { HandleExceptions } from 'src/common/helpers/handle.exceptions';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { User } from '../users/entities/user.entity';

@Module({
  controllers: [RolesController],
  providers: [RolesService, HandleExceptions],
  exports: [TypeOrmModule.forFeature([Role, User])],
})
export class RolesModule {}
