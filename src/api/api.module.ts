import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
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
import { RolesModule } from './roles/roles.module';
import { MembersModule } from './members/members.module';
import { PersonModule } from './person/person.module';
import { SubCategoriesModule } from './sub-categories/sub-categories.module';
import { UsersModule } from './users/users.module';
import { RoleGuard } from '../guards/role/role.guard';

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
    RolesModule,
    MembersModule,
    PersonModule,
    SubCategoriesModule,
    UsersModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    },
  ],
})
export class ApiModule {}
