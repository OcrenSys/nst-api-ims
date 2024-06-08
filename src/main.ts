import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
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

  console.log('\n\n\nPORT:', PORT);
  console.log('HOST:', HOST);

  console.log('\n\n\nKEY_PEM:', process.env.KEY_PEM);
  console.log('SERVER_CRT:', process.env.SERVER_CRT);

  const httpsOptions =
    keyPath && cerPath ? { key: keyPath, cert: cerPath } : undefined;

  console.log('\n\n\nHTTPS Options:', httpsOptions);

  const corsOptions = {
    origin: 'https://localhost:4200',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    allowedHeaders: 'Content-Type, Authorization',
    optionsSuccessStatus: 204,
    preflightContinue: false,
  };

  console.log('\n\n\ncorsOptions:', corsOptions);

  try {
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
    console.log(`Application is running on: ${await app.getUrl()}`);
  } catch (error) {
    console.error('Error starting the application', error);
    process.exit(1);
  }
}

bootstrap();
