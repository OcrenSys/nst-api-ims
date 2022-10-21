import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvoicesService } from './invoices.service';
import { InvoicesController } from './invoices.controller';
import { Invoice } from './entities/invoice.entity';
import { Product } from '../products/entities/product.entity';
import { Variant } from '../variants/entities/variant.entity';
import { InvoicesDetail } from '../invoices-details/entities/invoices-detail.entity';
import { Customer } from '../customers/entities/customer.entity';
import { Member } from '../members/entities/member.entity';
import { HandleExceptions } from '../../common/helpers/handle.exceptions';
import { Credit } from '../credits/entities/credit.entity';

@Module({
  controllers: [InvoicesController],
  providers: [InvoicesService, HandleExceptions],
  imports: [
    TypeOrmModule.forFeature([
      Invoice,
      Product,
      Variant,
      Credit,
      InvoicesDetail,
      Customer,
      Member,
    ]),
  ],
})
export class InvoicesModule {}
