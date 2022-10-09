import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PercentsService } from './percents.service';
import { CreatePercentDto } from './dto/create-percent.dto';
import { UpdatePercentDto } from './dto/update-percent.dto';
import { Roles } from '../../decorators/role.decorator';
import { RoleEnum } from '../../common/enums/roles.enum';

@Controller('percents')
export class PercentsController {
  constructor(private readonly percentsService: PercentsService) {}

  @Post()
  @Roles(RoleEnum.Admin)
  create(@Body() createPercentDto: CreatePercentDto) {
    return this.percentsService.create(createPercentDto);
  }

  @Get()
  @Roles(RoleEnum.Admin)
  findAll() {
    return this.percentsService.findAll();
  }

  @Get(':id')
  @Roles(RoleEnum.Admin)
  findOne(@Param('id') id: string) {
    return this.percentsService.findOne(+id);
  }

  @Patch(':id')
  @Roles(RoleEnum.Admin)
  update(@Param('id') id: string, @Body() updatePercentDto: UpdatePercentDto) {
    return this.percentsService.update(+id, updatePercentDto);
  }

  @Delete(':id')
  @Roles(RoleEnum.Admin)
  remove(@Param('id') id: string) {
    return this.percentsService.remove(+id);
  }
}
