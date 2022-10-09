import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SubCategoriesService } from './sub-categories.service';
import { CreateSubCategoryDto } from './dto/create-sub-category.dto';
import { UpdateSubCategoryDto } from './dto/update-sub-category.dto';
import { Roles } from '../../decorators/role.decorator';
import { RoleEnum } from '../../common/enums/roles.enum';

@Controller('sub-categories')
export class SubCategoriesController {
  constructor(private readonly subCategoriesService: SubCategoriesService) {}

  @Post()
  @Roles(RoleEnum.Admin)
  create(@Body() createSubCategoryDto: CreateSubCategoryDto) {
    return this.subCategoriesService.create(createSubCategoryDto);
  }

  @Get()
  findAll() {
    return this.subCategoriesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.subCategoriesService.findOne(+id);
  }

  @Patch(':id')
  @Roles(RoleEnum.Admin)
  update(
    @Param('id') id: string,
    @Body() updateSubCategoryDto: UpdateSubCategoryDto,
  ) {
    return this.subCategoriesService.update(+id, updateSubCategoryDto);
  }

  @Delete(':id')
  @Roles(RoleEnum.Admin)
  remove(@Param('id') id: string) {
    return this.subCategoriesService.remove(+id);
  }
}
