import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HandleExceptions } from '../../common/helpers/handle.exceptions';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { Role } from '../../database/models/role.entity';
import { User } from '../../database/models/user.entity';

@Module({
  controllers: [RolesController],
  providers: [RolesService, HandleExceptions],
  imports: [TypeOrmModule.forFeature([Role, User])],
})
export class RolesModule {}
