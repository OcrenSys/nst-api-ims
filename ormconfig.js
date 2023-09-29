const path = require('path'); // eslint-disable-line
conole.log('ORMCONFIG, process.env...', process.env);

module.exports = {
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
