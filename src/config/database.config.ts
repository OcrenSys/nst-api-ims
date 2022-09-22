import { TypeOrmModuleOptions } from '@nestjs/typeorm';

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
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10),
    username: process.env.DATABASE_USERNAME,
    database: process.env.DATABASE_NAME,
    password: process.env.DATABASE_PASSWORD,
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    migrations: [__dirname + '/../database/migrations/*{.ts,.js}'],
    extra: {
      charset: 'utf8mb4_unicode_ci',
    },
    synchronize: true,
    dropSchema: false,
    migrationsRun: true,
    logging: true,
  } as TypeOrmModuleOptions);
