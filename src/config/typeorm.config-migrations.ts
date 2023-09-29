import { DataSource } from 'typeorm';
require('dotenv').config();

export default new DataSource({
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
});
