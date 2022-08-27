import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PercentsService } from './percents.service';
import { CreatePercentDto } from './dto/create-percent.dto';
import { UpdatePercentDto } from './dto/update-percent.dto';

@Controller('percents')
export class PercentsController {
  constructor(private readonly percentsService: PercentsService) {}

  @Post()
  create(@Body() createPercentDto: CreatePercentDto) {
    return this.percentsService.create(createPercentDto);
  }

  @Get()
  findAll() {
    return this.percentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.percentsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePercentDto: UpdatePercentDto) {
    return this.percentsService.update(+id, updatePercentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.percentsService.remove(+id);
  }
}
