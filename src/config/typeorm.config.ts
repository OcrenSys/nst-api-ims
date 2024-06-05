import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';
import { DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';
require('dotenv').config();

export default () => ({ ...typeOrmConfigAsync });

export const typeOrmConfigAsync: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (): Promise<TypeOrmModuleOptions> => {
    const dataSourceAndSeederOptions: DataSourceOptions & SeederOptions = {
      type: 'mysql',
      host: process.env.MYSQLHOST,
      port: parseInt(process.env.MYSQLPORT, 10),
      username: process.env.MYSQLUSER,
      database: process.env.MYSQLDATABASE,
      password: process.env.MYSQLPASSWORD,

      dropSchema: Boolean(process.env.TYPEORM_DROP_SCHEMA),
      synchronize: Boolean(process.env.TYPEORM_SINCHRONIZE),
      migrationsRun: Boolean(process.env.TYPEORM_MIGRATIONS_RUN),
      logging: Boolean(process.env.TYPEORM_LOGGING),

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
  host: process.env.MYSQLHOST,
  port: parseInt(process.env.MYSQLPORT, 10),
  username: process.env.MYSQLUSER,
  database: process.env.MYSQLDATABASE,
  password: process.env.MYSQLPASSWORD,

  dropSchema: Boolean(process.env.TYPEORM_DROP_SCHEMA),
  synchronize: Boolean(process.env.TYPEORM_SINCHRONIZE),
  migrationsRun: Boolean(process.env.TYPEORM_MIGRATIONS_RUN),
  logging: Boolean(process.env.TYPEORM_LOGGING),

  entities: [`${__dirname}/../**/*.entity.{js,ts}`],
  migrations: [`${__dirname}/../database/migrations/*{.ts,.js}`],
  migrationsTableName: 'migrations',
  extra: {
    charset: 'utf8mb4_unicode_ci',
  },
};
