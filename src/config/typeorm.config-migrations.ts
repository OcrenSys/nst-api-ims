import { DataSource } from 'typeorm';
require('dotenv').config();

export default new DataSource({
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
});
