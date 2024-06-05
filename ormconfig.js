const path = require('path'); // eslint-disable-line
require('dotenv').config();

module.exports = {
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

  entities: [path.resolve(__dirname, 'src/**/*.entity.{js,ts}')],
  migrations: [path.resolve(__dirname, 'src/database/migrations/*{.ts,.js}')],
  logger: 'advanced-console',
  logging: ['warn', 'error'],
  cli: {
    migrationsDir: path.resolve('src/database/migrations'),
  },

  seeds: [path.resolve(__dirname, 'src/database/seeders/**/*{.ts,.js}')],
  factories: [path.resolve(__dirname, 'src/database/factories/**/*{.ts,.js}')],
};
