// const path = require('path'); // eslint-disable-line
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  CorsOptions,
  CorsOptionsDelegate,
} from '@nestjs/common/interfaces/external/cors-options.interface';
import { ValidationPipe } from '@nestjs/common';
import {
  SwaggerDocumentOptions,
  DocumentBuilder,
  SwaggerModule,
} from '@nestjs/swagger';

const keyPath = process.env.KEY_PEM
  ? process.env.KEY_PEM.replace(/\\n/gm, '\n')
  : undefined;
const cerPath = process.env.SERVER_CRT
  ? process.env.SERVER_CRT.replace(/\\n/gm, '\n')
  : undefined;

async function bootstrap() {
  const API_V1 = 'api/v1';
  const PORT: number = parseInt(process.env.PORT, 10) || 3000;
  const HOST: string = process.env.HOST || '0.0.0.0';

  const httpsOptions = {
    key: keyPath,
    cert: cerPath,
  };
  const corsOptions: CorsOptions | CorsOptionsDelegate<any> | any = {
    origin: 'https://localhost:4200',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    allowedHeaders: 'Content-Type, Authorization',
    optionsSuccessStatus: 204,
    preflightContinue: false,
  };

  const app = await NestFactory.create(AppModule, { httpsOptions });
  app.enableCors(corsOptions);
  app.setGlobalPrefix(API_V1);
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('IMS API')
    .setDescription('IMS API endpoints for developers')
    .setVersion('1.0')
    .addTag('ims')
    .addBearerAuth()
    .build();

  const options: SwaggerDocumentOptions = {
    deepScanRoutes: true,
  };

  const document = SwaggerModule.createDocument(app, config, options);
  SwaggerModule.setup(API_V1, app, document);

  await app.listen(PORT, HOST);
}
bootstrap();
