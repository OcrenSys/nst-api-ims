import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { VariantsModule } from './variants/variants.module';
import { BrandsModule } from './brands/brands.module';
import { CustomersModule } from './customers/customers.module';
import { CategoriesModule } from './categories/categories.module';
import { BannersModule } from './banners/banners.module';
import { SectionsModule } from './sections/sections.module';
import { ImagesModule } from './images/images.module';
import { InvoicesModule } from './invoices/invoices.module';
import { InvoicesDetailsModule } from './invoices-details/invoices-details.module';
import { PaymentsModule } from './payments/payments.module';
import { PaymentDatesModule } from './payment-dates/payment-dates.module';
import { CreditsModule } from './credits/credits.module';
import { PercentsModule } from './percents/percents.module';

@Module({
  imports: [
    ProductsModule,
    VariantsModule,
    BrandsModule,
    CustomersModule,
    CategoriesModule,
    ImagesModule,
    BannersModule,
    SectionsModule,
    InvoicesModule,
    InvoicesDetailsModule,
    PaymentsModule,
    PaymentDatesModule,
    CreditsModule,
    PercentsModule,
  ],
  controllers: [],
  providers: [],
})
export class ApiModule {}
