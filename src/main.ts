// const path = require('path'); // eslint-disable-line
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  CorsOptions,
  CorsOptionsDelegate,
} from '@nestjs/common/interfaces/external/cors-options.interface';
import fs from 'fs';
import { ValidationPipe } from '@nestjs/common';

const keyPath = 'src/common/helpers/secrets/key.pem';
const cerPath = 'src/common/helpers/secrets/server.crt';
const options: any = {};

if (fs.existsSync(keyPath) && fs.existsSync(cerPath)) {
  options.httpsOptions = {
    cert: fs.readFileSync(keyPath),
    key: fs.readFileSync(cerPath),
  };
}

async function bootstrap() {
  const prefix = 'api/v1';
  const port: number = parseInt(process.env.API_PORT_DEV, 10) || 3000;
  const httpsOptions = {
    key: fs.readFileSync(keyPath),
    cert: fs.readFileSync(cerPath),
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
