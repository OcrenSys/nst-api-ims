import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersService } from './order.service';
import { OrdersController } from './order.controller';
import { Order } from '../../database/models/order.entity';
import { Product } from '../../database/models/product.entity';
import { Variant } from '../../database/models/variant.entity';
import { OrderDetail } from '../../database/models/order-detail.entity';
import { Customer } from '../../database/models/customer.entity';
import { Member } from '../../database/models/member.entity';
import { HandleExceptions } from '../../common/helpers/handle.exceptions';
import { Credit } from '../../database/models/credit.entity';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService, HandleExceptions],
  imports: [
    TypeOrmModule.forFeature([
      Order,
      Product,
      Variant,
      Credit,
      OrderDetail,
      Customer,
      Member,
    ]),
  ],
})
export class OrdersModule {}
