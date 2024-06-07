import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { Auth } from '../../common/decorators/auth.decorator';
import { RoleEnum } from '../../common/enums/roles.enum';
import { BrandsService } from './brands.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Brands')
@ApiBearerAuth()
@Controller('brands')
export class BrandsController {
  constructor(private readonly brandsService: BrandsService) {}

  @Post()
  @Auth(RoleEnum.Admin, RoleEnum.Sales)
  create(@Body() createBrandDto: CreateBrandDto) {
    return this.brandsService.create(createBrandDto);
  }

  @Get()
  @Auth(RoleEnum.Admin, RoleEnum.Sales)
  findAll() {
    return this.brandsService.findAll();
  }

  @Get(':id')
  @Auth(RoleEnum.Admin, RoleEnum.Sales)
  findOne(@Param('id') id: string) {
    return this.brandsService.findOne(+id);
  }

  @Patch(':id')
  @Auth(RoleEnum.Admin, RoleEnum.Sales)
  update(@Param('id') id: string, @Body() updateBrandDto: UpdateBrandDto) {
    return this.brandsService.update(+id, updateBrandDto);
  }

  @Delete(':id')
  @Auth(RoleEnum.Admin, RoleEnum.Sales)
  remove(@Param('id') id: string) {
    return this.brandsService.remove(+id);
  }
}
