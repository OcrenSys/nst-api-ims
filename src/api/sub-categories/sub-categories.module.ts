import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubCategoriesService } from './sub-categories.service';
import { SubCategoriesController } from './sub-categories.controller';
import { SubCategory } from './entities/sub-category.entity';
import { Category } from '../categories/entities/category.entity';
import { HandleExceptions } from '../../common/helpers/handle.exceptions';

@Module({
  controllers: [SubCategoriesController],
  providers: [SubCategoriesService, HandleExceptions],
  imports: [TypeOrmModule.forFeature([SubCategory, Category])],
})
export class SubCategoriesModule {}
