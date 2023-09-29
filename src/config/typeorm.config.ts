import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';
import { DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';

export default () => ({ ...typeOrmConfigAsync });

export const typeOrmConfigAsync: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (): Promise<TypeOrmModuleOptions> => {
    const dataSourceAndSeederOptions: DataSourceOptions & SeederOptions = {
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT, 10),
      username: process.env.DATABASE_USERNAME,
      database: process.env.DATABASE_NAME,
      password: process.env.DATABASE_PASSWORD,
      dropSchema: process.env.NODE_ENV === 'development',
      synchronize: process.env.NODE_ENV === 'development',
      logging: process.env.NODE_ENV === 'development',
      migrationsRun: Boolean(process.env.TYPEORM_MIGRATIONS_RUN),
      entities: [`${__dirname}/../**/*.entity.{js,ts}`],
      migrations: [`${__dirname}/../database/migrations/*{.ts,.js}`],
      migrationsTableName: 'migrations',
      extra: {
        charset: 'utf8mb4_unicode_ci',
      },
    };
    return dataSourceAndSeederOptions;
  },
};

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT, 10),
  username: process.env.DATABASE_USERNAME,
  database: process.env.DATABASE_NAME,
  password: process.env.DATABASE_PASSWORD,
  dropSchema: process.env.NODE_ENV === 'development',
  synchronize: process.env.NODE_ENV === 'development',
  logging: process.env.NODE_ENV === 'development',
  migrationsRun: Boolean(process.env.TYPEORM_MIGRATIONS_RUN),
  entities: [`${__dirname}/../**/*.entity.{js,ts}`],
  migrations: [`${__dirname}/../database/migrations/*{.ts,.js}`],
  migrationsTableName: 'migrations',
  extra: {
    charset: 'utf8mb4_unicode_ci',
  },
};
