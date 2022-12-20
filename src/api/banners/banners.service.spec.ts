import { ConfigModule, ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import {
  getRepositoryToken,
  TypeOrmModule,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';
import { HandleExceptions } from '../../common/helpers/handle.exceptions';
import { BannersController } from './banners.controller';
import { BannersService } from './banners.service';
import { Image } from '../images/entities/image.entity';
import { Banner } from './entities/banner.entity';
import { Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateBannerDto } from './dto/create-banner.dto';
import { faker } from '@faker-js/faker';
import { ResponseHttp } from '../../common/helpers/interfaces/response.http';
import { UpdateBannerDto } from './dto/update-banner.dto';

describe('BannersService', () => {
  const logger = new Logger('BannersService - Logger');
  let bannerService: BannersService;
  let bannerRespository: Repository<Banner>;

  const BANNER_REPOSITORY_TOKEN = getRepositoryToken(Banner);
  const bannerRepositoryValues = {
    create: jest.fn(async (createBannerDto: CreateBannerDto) =>
      bannerRespository.create(createBannerDto),
    ),

    save: jest.fn((createBannerDto: CreateBannerDto) =>
      bannerRespository.save(createBannerDto),
    ),

    findAll: jest.fn(
      async (): Promise<ResponseHttp> => bannerService.findAll(),
    ),

    findOne: jest.fn(
      async (id: number): Promise<ResponseHttp> => bannerService.findOne(id),
    ),

    update: jest.fn(
      async (
        id: number,
        updateBannerDto: UpdateBannerDto,
      ): Promise<ResponseHttp> => bannerService.update(id, updateBannerDto),
    ),

    remove: jest.fn(
      (id: number): Promise<ResponseHttp> => bannerService.remove(id),
    ),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BannersController],
      providers: [
        BannersService,
        HandleExceptions,
        {
          provide: BANNER_REPOSITORY_TOKEN,
          useValue: bannerRepositoryValues,
        },
      ],
      imports: [
        ConfigModule.forRoot({
          envFilePath: ['.env'],
          isGlobal: true,
          cache: true,
        }),
        TypeOrmModule.forRootAsync({
          imports: [ConfigModule],
          inject: [ConfigService],

          useFactory: () => {
            const _module: TypeOrmModuleOptions = {
              type: 'mysql',
              host: process.env.DATABASE_LOCAL_HOST,
              port: parseInt(process.env.DATABASE_PORT, 10),
              username: process.env.DATABASE_USERNAME,
              database: process.env.DATABASE_NAME,
              password: process.env.DATABASE_PASSWORD,
              entities: [`${__dirname}/../**/*.entity.{js,ts}`],
              migrations: [`${__dirname}/../database/migrations/*{.ts,.js}`],
              extra: {
                charset: 'utf8mb4_unicode_ci',
              },
              synchronize: Boolean(process.env.TYPEORM_SYNCHRONIZE) || false,
              dropSchema: false, // not allow DELETE TABLES from DATABASE
              migrationsRun:
                Boolean(process.env.TYPEORM_MIGRATIONS_RUN) || false,
              logging: Boolean(process.env.TYPEORM_LOGGING) || false,
              retryAttempts: 5,
            };
            return _module;
          },
        }),
        TypeOrmModule.forFeature([Banner, Image]),
      ],
    }).compile();

    bannerService = module.get<BannersService>(BannersService);
    bannerRespository = module.get<Repository<Banner>>(BANNER_REPOSITORY_TOKEN);
  }, 20000);

  it('should be defined', () => {
    expect(bannerService).toBeDefined();
  });

  it('Should create banner', async () => {
    const bannerDto: CreateBannerDto = {
      name: `${faker.lorem.word()}`,
      description: faker.lorem.sentence(),
    };
    let response;

    try {
      response = await bannerRepositoryValues.create(bannerDto);
      await bannerRepositoryValues.save(response);
    } catch (e) {
      expect(e.message).toBe('No se ha podido crear el banner.');
    }

    expect(bannerRepositoryValues.create).toHaveBeenCalledWith(bannerDto);
    expect(response).toHaveProperty('name', bannerDto.name);
    expect(response).toHaveProperty('description', bannerDto.description);

    expect(bannerRepositoryValues.save).toHaveBeenCalledWith(response);
    expect(bannerRepositoryValues.save).toHaveReturned();
  });

  it('Should find all banners', async () => {
    let response;

    try {
      response = await bannerRepositoryValues.findAll();
    } catch (e) {
      // expect(e.message).toBe('Ocurrió un error al encontrar los banners.');
    }
  });

  it('Shoud find one banner by Id', async () => {
    const id = 21;
    let response;

    try {
      response = await bannerRepositoryValues.findOne(id);
    } catch (e) {
      // expect(e.message).toBe('Ocurrió un error al encontrar el banner.');
    }

    expect(bannerRepositoryValues.findOne).toHaveBeenCalled();
    expect(bannerRepositoryValues.findOne).toHaveBeenCalledWith(id);
  });
});
