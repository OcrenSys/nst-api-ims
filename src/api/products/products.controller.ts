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
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { RoleEnum } from '../../common/enums/roles.enum';
import { Auth } from '../../common/decorators/auth.decorator';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Products')
@ApiBearerAuth()
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @Auth(RoleEnum.Admin)
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  @Auth(RoleEnum.Admin)
  findAll(@Query() query: unknown) {
    return this.productsService.findAll(query);
  }

  @Get('bySubCategory/:id')
  findAllBySubCategory(@Param('id') id: number) {
    return this.productsService.findAll({ subCategory: { id: id } });
  }

  @Get(':id')
  @Auth(RoleEnum.Admin)
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @Patch(':id')
  @Auth(RoleEnum.Admin)
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  @Auth(RoleEnum.Admin)
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
