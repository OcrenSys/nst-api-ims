import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HandleExceptions } from '../..common/helpers/handle.exceptions';
import { InvoicesDetailsService } from './invoices-details.service';
import { InvoicesDetailsController } from './invoices-details.controller';
import { Invoice } from '../invoices/entities/invoice.entity';
import { InvoicesDetail } from './entities/invoices-detail.entity';
import { Product } from '../products/entities/product.entity';
import { Variant } from '../variants/entities/variant.entity';

@Module({
  controllers: [InvoicesDetailsController],
  providers: [InvoicesDetailsService, HandleExceptions],
  imports: [
    TypeOrmModule.forFeature([Invoice, Product, Variant, InvoicesDetail]),
  ],
})
export class InvoicesDetailsModule {}
