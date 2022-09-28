import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ApiModule } from './api/api.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import { DatabaseModule } from './database/database.module';
import { AuthenticationMiddleware } from './middlewares/authentication/authentication.middleware';
import { AuthenticationService } from './services/authentication/authentication.service';

@Module({
  imports: [ConfigModule, DatabaseModule, ApiModule],
  controllers: [AppController],
  providers: [AppService, AuthenticationService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(AuthenticationMiddleware).forRoutes({
      path: '/*',
      method: RequestMethod.ALL,
    });
  }
}
