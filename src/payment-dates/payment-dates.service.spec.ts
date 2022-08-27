import { Test, TestingModule } from '@nestjs/testing';
import { PaymentDatesService } from './payment-dates.service';

describe('PaymentDatesService', () => {
  let service: PaymentDatesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaymentDatesService],
    }).compile();

    service = module.get<PaymentDatesService>(PaymentDatesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
