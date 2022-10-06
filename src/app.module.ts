import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ApiModule } from './api/api.module';
import { UsersModule } from './api/users/users.module';
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
    consumer.apply(AuthenticationMiddleware).forRoutes({
      path: '/*',
      method: RequestMethod.ALL,
    });
  }
}
