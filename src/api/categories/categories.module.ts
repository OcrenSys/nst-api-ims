import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { Category } from '../../database/models/category.entity';
import { SubCategory } from '../../database/models/sub-category.entity';
import { Banner } from '../../database/models/banner.entity';
import { Image } from '../../database/models/image.entity';
import { HandleExceptions } from '../../common/helpers/handle.exceptions';

@Module({
  controllers: [CategoriesController],
  providers: [CategoriesService, HandleExceptions],
  imports: [TypeOrmModule.forFeature([Category, SubCategory, Banner, Image])],
})
export class CategoriesModule {}
