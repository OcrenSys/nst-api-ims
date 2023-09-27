// const path = require('path'); // eslint-disable-line
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  CorsOptions,
  CorsOptionsDelegate,
} from '@nestjs/common/interfaces/external/cors-options.interface';
import { ValidationPipe } from '@nestjs/common';

const keyPath = process.env.KEY_PEM
  ? process.env.KEY_PEM.replace(/\\n/gm, '\n')
  : undefined;
const cerPath = process.env.SERVER_CRT
  ? process.env.SERVER_CRT.replace(/\\n/gm, '\n')
  : undefined;

async function bootstrap() {
  const prefix = 'api/v1';
  const port: number = parseInt(process.env.API_PORT_DEV, 10) || 3000;
  const httpsOptions = {
    key: keyPath,
    cert: cerPath,
  };
  const corsOptions: CorsOptions | CorsOptionsDelegate<any> | any = {
    origin: '*',
    'Access-Control-Allow-Origin': '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  };

  const app = await NestFactory.create(AppModule, { httpsOptions });
  app.enableCors(corsOptions);
  app.setGlobalPrefix(prefix);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(port);
}
bootstrap();
