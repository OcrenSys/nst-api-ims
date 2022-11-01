import { Test, TestingModule } from '@nestjs/testing';
import { HandleExceptions } from '../../common/helpers/handle.exceptions';
import { BannersController } from './banners.controller';
import { BannersService } from './banners.service';
import { CreateBannerDto } from './dto/create-banner.dto';

describe('BannersController', () => {
  let controller: BannersController;

  const mockBannerService = {
    create: jest.fn((bannerDto) => ({
      id: Date.now(),
      ...bannerDto,
    })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BannersController],
      providers: [BannersService, HandleExceptions],
    })
      .overrideProvider(BannersService)
      .useValue(mockBannerService)
      .compile();

    controller = module.get<BannersController>(BannersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should be create a banner', () => {
    const bannerDto: CreateBannerDto = {
      name: 'Banner name mockup',
      description: 'Banner description mockup',
    };

    expect(controller.create(bannerDto)).toEqual({
      id: expect.any(Number),
      ...bannerDto,
    });

    expect(mockBannerService.create).toHaveBeenCalledWith({ ...bannerDto });
  });
});
