import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HandleExceptions } from '../../common/helpers/handle.exceptions';
import { OrdersDetailsService } from './order-details.service';
import { OrdersDetailsController } from './order-details.controller';
import { Order } from '../../database/models/order.entity';
import { OrderDetail } from '../../database/models/order-detail.entity';
import { Product } from '../../database/models/product.entity';
import { Variant } from '../../database/models/variant.entity';

@Module({
  controllers: [OrdersDetailsController],
  providers: [OrdersDetailsService, HandleExceptions],
  imports: [
    TypeOrmModule.forFeature([Order, Product, Variant, OrderDetail]),
  ],
})
export class OrdersDetailsModule {}
