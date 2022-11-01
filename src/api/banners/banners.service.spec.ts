// import { Logger } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { HandleExceptions } from '../../common/helpers/handle.exceptions';
import { BannersController } from './banners.controller';
import { BannersService } from './banners.service';
import { Image } from '../images/entities/image.entity';
import { Banner } from './entities/banner.entity';
// import * as Config from '../../config/database.config';
// import DatabaseConfig from '../../config/database.config';
import { Logger } from '@nestjs/common';
// import { AppModule } from '../../app.module';
// const env: NodeJS.ProcessEnv = process.env;
// const {
//   TYPEORM_LOGGING,
//   TYPEORM_MIGRATIONS_RUN,
//   TYPEORM_SYNCHRONIZE,

//   DATABASE_NAME,
//   DATABASE_PORT,
//   DATABASE_HOST,
//   DATABASE_PASSWORD,
//   DATABASE_USERNAME,
//   DATABASE_LOCAL_HOST,
// } = env;

describe('BannersService', () => {
  let service: BannersService;
  const logger = new Logger('BannersService - Logger');

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BannersController],
      providers: [BannersService, HandleExceptions],
      imports: [
        ConfigModule.forRoot({
          envFilePath: ['.env'],
          isGlobal: true,
          cache: true,
        }),
        // AppModule,
        TypeOrmModule.forRootAsync({
          imports: [ConfigModule],
          inject: [ConfigService],
          /* useFactory: (config: ConfigService) => {
            const configTest = config.get('test');
            logger.error('ConfigTest', configTest);
            return configTest;
          }, */

          useFactory: (config: ConfigService) => {
            const _module: TypeOrmModuleOptions = {
              type: 'mysql',
              host: config.get('DATABASE_LOCAL_HOST') || 'localhost',
              port: config.get('DATABASE_PORT') || 3306,
              username: config.get('DATABASE_USERNAME') || 'root',
              database: config.get('DATABASE_NAME') || 'variedades',
              password: config.get('DATABASE_PASSWORD') || 'N3wd3v3l0p*$',

              // host: DATABASE_LOCAL_HOST,
              // port: parseInt(DATABASE_PORT),
              // username: DATABASE_USERNAME,
              // database: DATABASE_NAME,
              // password: DATABASE_PASSWORD,
            };
            // logger.error(_module);

            return _module;
          },
        }),
        TypeOrmModule.forFeature([Banner, Image]),
      ],
    }).compile();

    service = module.get<BannersService>(BannersService);
  }, 60000);

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
