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
import { RoleEnum } from '../../common/enums/roles.enum';
import { Auth } from '../../common/decorators/auth.decorator';

@Controller('percents')
export class PercentsController {
  constructor(private readonly percentsService: PercentsService) {}

  @Post()
  @Auth(RoleEnum.Admin)
  create(@Body() createPercentDto: CreatePercentDto) {
    return this.percentsService.create(createPercentDto);
  }

  @Get()
  @Auth(RoleEnum.Admin)
  findAll() {
    return this.percentsService.findAll();
  }

  @Get(':id')
  @Auth(RoleEnum.Admin)
  findOne(@Param('id') id: string) {
    return this.percentsService.findOne(+id);
  }

  @Patch(':id')
  @Auth(RoleEnum.Admin)
  update(@Param('id') id: string, @Body() updatePercentDto: UpdatePercentDto) {
    return this.percentsService.update(+id, updatePercentDto);
  }

  @Delete(':id')
  @Auth(RoleEnum.Admin)
  remove(@Param('id') id: string) {
    return this.percentsService.remove(+id);
  }
}
