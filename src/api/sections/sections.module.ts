import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HandleExceptions } from '../../common/helpers/handle.exceptions';
import { SectionsService } from './sections.service';
import { SectionsController } from './sections.controller';
import { Product } from '../../database/models/product.entity';
import { Section } from '../../database/models/section.entity';

@Module({
  controllers: [SectionsController],
  providers: [SectionsService, HandleExceptions],
  imports: [TypeOrmModule.forFeature([Product, Section])],
})
export class SectionsModule {}
