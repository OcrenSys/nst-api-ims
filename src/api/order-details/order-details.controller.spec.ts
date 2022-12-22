import { Test, TestingModule } from '@nestjs/testing';
import { OrdersDetailsController } from './order-details.controller';
import { OrdersDetailsService } from './order-details.service';

describe('ordersDetailsController', () => {
  let controller: OrdersDetailsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrdersDetailsController],
      providers: [OrdersDetailsService],
    }).compile();

    controller = module.get<OrdersDetailsController>(
      OrdersDetailsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
