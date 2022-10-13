import { Module } from '@nestjs/common';
import { VariantsService } from './variants.service';
import { VariantsController } from './variants.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Variant } from './entities/variant.entity';
import { Image } from '../images/entities/image.entity';
import { Product } from '../products/entities/product.entity';
import { HandleExceptions } from '../../common/helpers/handle.exceptions';

@Module({
  controllers: [VariantsController],
  providers: [VariantsService, HandleExceptions],
  imports: [TypeOrmModule.forFeature([Variant, Image, Product])],
})
export class VariantsModule {}
