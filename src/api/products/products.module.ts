import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { Product } from '../../database/models/product.entity';
import { Variant } from '../../database/models/variant.entity';
import { Image } from '../../database/models/image.entity';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService],
  imports: [TypeOrmModule.forFeature([Product, Variant, Image])],
})
export class ProductsModule {}
