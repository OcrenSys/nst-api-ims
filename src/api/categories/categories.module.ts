import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { Category } from './entities/category.entity';
import { SubCategory } from '../sub-categories/entities/sub-category.entity';
import { Banner } from '../banners/entities/banner.entity';
import { Image } from '../images/entities/image.entity';
import { HandleExceptions } from '../../common/helpers/handle.exceptions';

@Module({
  controllers: [CategoriesController],
  providers: [CategoriesService, HandleExceptions],
  imports: [TypeOrmModule.forFeature([Category, SubCategory, Banner, Image])],
})
export class CategoriesModule {}
