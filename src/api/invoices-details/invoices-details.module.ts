import { Module } from '@nestjs/common';
import { InvoicesDetailsService } from './invoices-details.service';
import { InvoicesDetailsController } from './invoices-details.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HandleExceptions } from 'src/common/helpers/handle.exceptions';
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
