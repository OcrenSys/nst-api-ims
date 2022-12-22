import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VariantsService } from './variants.service';
import { VariantsController } from './variants.controller';
import { Variant } from '../../database/models/variant.entity';
import { Image } from '../../database/models/image.entity';
import { Product } from '../../database/models/product.entity';
import { HandleExceptions } from '../../common/helpers/handle.exceptions';

@Module({
  controllers: [VariantsController],
  providers: [VariantsService, HandleExceptions],
  imports: [TypeOrmModule.forFeature([Variant, Image, Product])],
})
export class VariantsModule {}
