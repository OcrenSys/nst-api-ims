import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import fs from 'fs';

const keyPath = './src/common/secrets/key.pem';
const cerPath = './src/common/secrets/cert.pem';
const options: any = {};

if (fs.existsSync(keyPath) && fs.existsSync(cerPath)) {
  options.httpsOptions = {
    cert: fs.readFileSync(keyPath),
    key: fs.readFileSync(cerPath),
  };
}

async function bootstrap() {
  const httpsOptions = {
    key: fs.readFileSync(keyPath),
    cert: fs.readFileSync(cerPath),
  };

  const app = await NestFactory.create(AppModule, { httpsOptions });
  app.enableCors();
  app.setGlobalPrefix('api/v1');
  await app.listen(3000);
}
bootstrap();
