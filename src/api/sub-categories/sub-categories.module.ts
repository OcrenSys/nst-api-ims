import { Module } from '@nestjs/common';
import { SubCategoriesService } from './sub-categories.service';
import { SubCategoriesController } from './sub-categories.controller';
import { SubCategory } from './entities/sub-category.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from '../categories/entities/category.entity';

@Module({
  controllers: [SubCategoriesController],
  providers: [SubCategoriesService],
  imports: [TypeOrmModule.forFeature([SubCategory, Category])],
})
export class SubCategoriesModule {}
