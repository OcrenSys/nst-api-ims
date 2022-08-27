import { Test, TestingModule } from '@nestjs/testing';
import { PercentsController } from './percents.controller';
import { PercentsService } from './percents.service';

describe('PercentsController', () => {
  let controller: PercentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PercentsController],
      providers: [PercentsService],
    }).compile();

    controller = module.get<PercentsController>(PercentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
