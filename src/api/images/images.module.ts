import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HandleExceptions } from '../../common/helpers/handle.exceptions';
import { ImagesService } from './images.service';
import { ImagesController } from './images.controller';
import { Image } from '../../database/models/image.entity';
import { Category } from '../../database/models/category.entity';
import { SubCategory } from '../../database/models/sub-category.entity';
import { Product } from '../../database/models/product.entity';
import { Variant } from '../../database/models/variant.entity';
import { Banner } from '../../database/models/banner.entity';

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
