const path = require('path'); // eslint-disable-line

const baseConfig = {
  type: 'mysql',
  database: process.env.DATABASE_NAME,
  entities: [path.resolve(__dirname, 'src/**/*.entity.{js,ts}')],
  migrations: [path.resolve(__dirname, 'src/database/migrations/*{.ts,.js}')],
  logger: 'advanced-console',
  logging: ['warn', 'error'],
  cli: {
    migrationsDir: path.resolve('src/database/migrations'),
  },
};

const otherConfig = {
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT, 10),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  ...baseConfig,
};

module.exports = {
  seeds: [path.resolve(__dirname, 'src/database/seeds/**/*{.ts,.js}')],
  factories: [path.resolve(__dirname, 'src/database/factories/**/*{.ts,.js}')],
  ...baseConfig,
  ...otherConfig,
  dropSchema: Boolean(process.env.TYPEORM_DROP_SCHEMA_CONFIG) || false,
  synchronize: Boolean(process.env.TYPEORM_SYNCHRONIZE) || false,
  migrationsRun: Boolean(process.env.TYPEORM_MIGRATIONS_RUN) || false,
};