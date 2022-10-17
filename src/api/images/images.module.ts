import { Module } from '@nestjs/common';
import { ImagesService } from './images.service';
import { ImagesController } from './images.controller';
import { HandleExceptions } from 'src/common/helpers/handle.exceptions';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Image } from './entities/image.entity';
import { Category } from '../categories/entities/category.entity';
import { SubCategory } from '../sub-categories/entities/sub-category.entity';
import { Product } from '../products/entities/product.entity';
import { Variant } from '../variants/entities/variant.entity';
import { Banner } from '../banners/entities/banner.entity';

@Module({
  controllers: [ImagesController],
  providers: [ImagesService, HandleExceptions],
  imports: [
    TypeOrmModule.forFeature([
      Image,
      Banner,
      Category,
      SubCategory,
      Product,
      Variant,
    ]),
  ],
})
export class ImagesModule {}
