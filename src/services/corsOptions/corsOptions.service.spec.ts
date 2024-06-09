import { Test, TestingModule } from '@nestjs/testing';
import { CorsOptionsService } from './corsOptions.service';

describe('CorsOptionsService', () => {
  let service: CorsOptionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CorsOptionsService],
    }).compile();

    service = module.get<CorsOptionsService>(CorsOptionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
