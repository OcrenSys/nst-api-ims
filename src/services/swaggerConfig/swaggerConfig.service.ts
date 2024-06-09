import { INestApplication, Injectable } from '@nestjs/common';
import {
  DocumentBuilder,
  SwaggerDocumentOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import {
  NODE_ENV,
  ENABLE_SWAGGER,
} from '../../common/constants/https.constants';

@Injectable()
export class SwaggerConfigService {
  getSwaggerConfig(app: INestApplication) {
    if (
      process.env.NODE_ENV !== NODE_ENV.production ||
      process.env.ENABLE_SWAGGER === ENABLE_SWAGGER
    ) {
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
      SwaggerModule.setup(process.env.API, app, document);
    }
  }
}
