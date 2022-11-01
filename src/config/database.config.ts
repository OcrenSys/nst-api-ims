import { TypeOrmModuleOptions } from '@nestjs/typeorm';
const env: NodeJS.ProcessEnv = process.env;
const {
  TYPEORM_LOGGING,
  TYPEORM_MIGRATIONS_RUN,
  TYPEORM_SYNCHRONIZE,
  DATABASE_NAME,
  DATABASE_PORT,
  DATABASE_HOST,
  DATABASE_PASSWORD,
  DATABASE_USERNAME,
  DATABASE_LOCAL_HOST,
} = env;

export default () =>
  ({
    /*
  |--------------------------------------------------------------------------
  | Database Connection
  |--------------------------------------------------------------------------
  |
  | Here you may specify which of the database connections you wish
  | to use as your default connection for all database work.
  |
  */

    type: 'mysql',
    host: DATABASE_HOST,
    port: parseInt(DATABASE_PORT, 10),
    username: DATABASE_USERNAME,
    database: DATABASE_NAME,
    password: DATABASE_PASSWORD,
    entities: [`${__dirname}/../**/*.entity.{js,ts}`],
    migrations: [`${__dirname}/../database/migrations/*{.ts,.js}`],
    extra: {
      charset: 'utf8mb4_unicode_ci',
    },
    synchronize: Boolean(TYPEORM_SYNCHRONIZE) || false,
    // dropSchema: Boolean(process.env.TYPEORM_DROP_SCHEMA) || false,
    dropSchema: false, // not allow DELETE TABLES from DATABASE
    migrationsRun: Boolean(TYPEORM_MIGRATIONS_RUN) || false,
    logging: Boolean(TYPEORM_LOGGING) || false,
    retryAttempts: 5,
  } as TypeOrmModuleOptions);

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: DATABASE_HOST,
  port: parseInt(DATABASE_PORT, 10),
  username: DATABASE_USERNAME,
  database: DATABASE_NAME,
  password: DATABASE_PASSWORD,
  entities: [`${__dirname}/../**/*.entity.{js,ts}`],
  migrations: [`${__dirname}/../database/migrations/*{.ts,.js}`],
  extra: {
    charset: 'utf8mb4_unicode_ci',
  },
  synchronize: Boolean(TYPEORM_SYNCHRONIZE) || false,
  logging: Boolean(TYPEORM_LOGGING) || false,
};

export const TestConfig = (): TypeOrmModuleOptions => ({
  type: 'mysql',
  host: DATABASE_LOCAL_HOST,
  port: parseInt(DATABASE_PORT, 10) || 3306,
  username: DATABASE_USERNAME,
  database: DATABASE_NAME,
  password: DATABASE_PASSWORD,
  entities: [`${__dirname}/../**/*.entity.{js,ts}`],
  migrations: [`${__dirname}/../database/migrations/*{.ts,.js}`],
  extra: {
    charset: 'utf8mb4_unicode_ci',
  },
  synchronize: Boolean(TYPEORM_SYNCHRONIZE) || false,
  logging: Boolean(TYPEORM_LOGGING) || false,
  retryAttempts: 3,
});
