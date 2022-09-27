import { Test, TestingModule } from '@nestjs/testing';
import { PaymentDatesController } from './payment-dates.controller';
import { PaymentDatesService } from './payment-dates.service';

describe('PaymentDatesController', () => {
  let controller: PaymentDatesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentDatesController],
      providers: [PaymentDatesService],
    }).compile();

    controller = module.get<PaymentDatesController>(PaymentDatesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
