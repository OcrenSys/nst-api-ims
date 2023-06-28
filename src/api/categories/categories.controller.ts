import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { Auth } from '../../common/decorators/auth.decorator';
import { RoleEnum } from '../../common/enums/roles.enum';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from '../../database/models/category.entity';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @Auth(RoleEnum.Admin)
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @Get()
  @Auth(RoleEnum.Sales, RoleEnum.Admin)
  findAll(@Query() query: any) {
    return this.categoriesService.findAll(query);
  }

  @Get(':id')
  @Auth(RoleEnum.Sales, RoleEnum.Admin)
  findOne(@Param('id') id: string) {
    return this.categoriesService.findOne(+id);
  }

  @Patch(':id')
  @Auth(RoleEnum.Admin)
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoriesService.update(+id, updateCategoryDto);
  }

  @Delete(':id')
  @Auth(RoleEnum.Admin)
  remove(@Param('id') id: string) {
    return this.categoriesService.remove(+id);
  }

  @Post()
  @Auth(RoleEnum.Sales, RoleEnum.Admin)
  reorder(@Body() categories: Category[]) {
    return this.categoriesService.reorder(categories);
  }
}
