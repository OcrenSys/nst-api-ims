import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Roles } from '../../decorators/role.decorator';
import { RoleEnum } from '../../common/enums/roles.enum';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  @Roles(RoleEnum.Admin)
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.create(createRoleDto);
  }

  @Get()
  @Roles(RoleEnum.Admin)
  findAll() {
    return this.rolesService.findAll();
  }

  @Get(':id')
  @Roles(RoleEnum.Admin)
  findOne(@Param('id') id: string) {
    return this.rolesService.findOne(+id);
  }

  @Patch(':id')
  @Roles(RoleEnum.Admin)
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.rolesService.update(+id, updateRoleDto);
  }

  @Delete(':id')
  @Roles(RoleEnum.Admin)
  remove(@Param('id') id: string) {
    return this.rolesService.remove(+id);
  }
}
