import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ApiModule } from './api/api.module';
import { BannersController } from './api/banners/banners.controller';
import { BrandsController } from './api/brands/brands.controller';
import { CategoriesController } from './api/categories/categories.controller';
import { CreditsController } from './api/credits/credits.controller';
import { CustomersController } from './api/customers/customers.controller';
import { ImagesController } from './api/images/images.controller';
import { InvoicesDetailsController } from './api/invoices-details/invoices-details.controller';
import { InvoicesController } from './api/invoices/invoices.controller';
import { MembersController } from './api/members/members.controller';
import { PaymentDatesController } from './api/payment-dates/payment-dates.controller';
import { PaymentsController } from './api/payments/payments.controller';
import { PercentsController } from './api/percents/percents.controller';
import { PersonController } from './api/person/person.controller';
import { ProductsController } from './api/products/products.controller';
import { RolesController } from './api/roles/roles.controller';
import { SectionsController } from './api/sections/sections.controller';
import { SubCategoriesController } from './api/sub-categories/sub-categories.controller';
import { UsersController } from './api/users/users.controller';
import { UsersModule } from './api/users/users.module';
import { VariantsController } from './api/variants/variants.controller';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import { DatabaseModule } from './database/database.module';
import { AuthenticationMiddleware } from './middlewares/authentication/authentication.middleware';
import { AuthenticationService } from './services/authentication/authentication.service';
import { AuthorizationService } from './services/authorization/authorization.service';

@Module({
  imports: [ConfigModule, DatabaseModule, ApiModule, UsersModule],
  controllers: [AppController],
  providers: [AppService, AuthenticationService, AuthorizationService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer
      .apply(AuthenticationMiddleware)
      .exclude(
        { path: `api/v1/banners`, method: RequestMethod.GET },
        { path: `api/v1/brands`, method: RequestMethod.GET },
        { path: `api/v1/categories`, method: RequestMethod.GET },
        { path: `api/v1/products`, method: RequestMethod.GET },
        { path: `api/v1/sections`, method: RequestMethod.GET },
        { path: `api/v1/sub-categories`, method: RequestMethod.GET },
        { path: `api/v1/variants`, method: RequestMethod.GET },
      )
      .forRoutes(
        BannersController,
        BrandsController,
        CategoriesController,
        CreditsController,
        CustomersController,
        ImagesController,
        InvoicesController,
        InvoicesDetailsController,
        MembersController,
        PaymentDatesController,
        PaymentsController,
        PercentsController,
        PersonController,
        ProductsController,
        RolesController,
        SectionsController,
        SubCategoriesController,
        UsersController,
        VariantsController,
      );
  }
}
