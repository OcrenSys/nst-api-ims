import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HandleExceptions } from '../..common/helpers/handle.exceptions';
import { SectionsService } from './sections.service';
import { SectionsController } from './sections.controller';
import { Product } from '../products/entities/product.entity';
import { Section } from './entities/section.entity';

@Module({
  controllers: [SectionsController],
  providers: [SectionsService, HandleExceptions],
  imports: [TypeOrmModule.forFeature([Product, Section])],
})
export class SectionsModule {}
