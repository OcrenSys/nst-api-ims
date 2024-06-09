import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

import { HttpOptionsService } from './services/httpOptions/httpOptions.service';
import { CorsOptionsService } from './services/corsOptions/corsOptions.service';
import { SwaggerConfigService } from './services/swaggerConfig/swaggerConfig.service';

async function bootstrap() {
  const PORT: number = parseInt(process.env.PORT, 10) || 3000;
  const HOST: string = process.env.HOST || '0.0.0.0';
  const API = process.env.API;

  try {
    let app = await NestFactory.create(AppModule);
    const httpsOptionsService = app.get(HttpOptionsService);
    const corsOptionsService = app.get(CorsOptionsService);
    const swaggerConfigService = app.get(SwaggerConfigService);
    const httpsOptions = httpsOptionsService.getHttpsOptions();

    if (httpsOptions)
      app = await NestFactory.create(AppModule, { httpsOptions });

    swaggerConfigService.getSwaggerConfig(app);
    app.enableCors(corsOptionsService.getCorsOptions());
    app.setGlobalPrefix(API);
    app.useGlobalPipes(new ValidationPipe());

    await app.listen(PORT, HOST);
  } catch (error) {
    process.exit(1);
  }
}

bootstrap();
