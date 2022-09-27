import { Test, TestingModule } from '@nestjs/testing';
import { InvoicesDetailsController } from './invoices-details.controller';
import { InvoicesDetailsService } from './invoices-details.service';

describe('InvoicesDetailsController', () => {
  let controller: InvoicesDetailsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InvoicesDetailsController],
      providers: [InvoicesDetailsService],
    }).compile();

    controller = module.get<InvoicesDetailsController>(InvoicesDetailsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
