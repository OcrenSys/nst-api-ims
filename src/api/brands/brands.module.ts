import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BrandsService } from './brands.service';
import { BrandsController } from './brands.controller';
import { Product } from '../products/entities/product.entity';
import { Brand } from './entities/brand.entity';
import { HandleExceptions } from '../../common/helpers/handle.exceptions';

@Module({
  controllers: [BrandsController],
  providers: [BrandsService, HandleExceptions],
  imports: [TypeOrmModule.forFeature([Brand, Product])],
})
export class BrandsModule {}
