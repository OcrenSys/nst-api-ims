import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import AppConfig from './app.config';
import DatabaseConfig, { TestConfig } from './database.config';
import MailConfig from './mail.config';

@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env${
        process.env.NODE_ENV ? `.${process.env.NODE_ENV}` : ''
      }`,
      load: [
        () => ({ app: AppConfig() }),
        () => ({ test: TestConfig() }),
        () => ({ database: DatabaseConfig() }),
        () => ({ mail: MailConfig() }),
      ],
    }),
  ],
})
export class ConfigModule {}
