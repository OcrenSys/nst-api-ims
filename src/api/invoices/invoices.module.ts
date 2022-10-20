import { Module } from '@nestjs/common';
import { InvoicesService } from './invoices.service';
import { InvoicesController } from './invoices.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Invoice } from '../invoices/entities/invoice.entity';
import { Product } from '../products/entities/product.entity';
import { Variant } from '../variants/entities/variant.entity';
import { InvoicesDetail } from '../invoices-details/entities/invoices-detail.entity';
import { Customer } from '../customers/entities/customer.entity';
import { Member } from '../members/entities/member.entity';
import { HandleExceptions } from '../../common/helpers/handle.exceptions';

@Module({
  controllers: [InvoicesController],
  providers: [InvoicesService, HandleExceptions],
  imports: [
    TypeOrmModule.forFeature([
      Invoice,
      Product,
      Variant,
      InvoicesDetail,
      Customer,
      Member,
    ]),
  ],
})
export class InvoicesModule {}
