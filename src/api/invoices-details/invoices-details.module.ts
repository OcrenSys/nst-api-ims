import { Module } from '@nestjs/common';
import { InvoicesDetailsService } from './invoices-details.service';
import { InvoicesDetailsController } from './invoices-details.controller';

@Module({
  controllers: [InvoicesDetailsController],
  providers: [InvoicesDetailsService]
})
export class InvoicesDetailsModule {}
