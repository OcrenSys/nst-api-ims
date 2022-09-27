import { Injectable } from '@nestjs/common';
import { CreatePaymentDateDto } from './dto/create-payment-date.dto';
import { UpdatePaymentDateDto } from './dto/update-payment-date.dto';

@Injectable()
export class PaymentDatesService {
  create(createPaymentDateDto: CreatePaymentDateDto) {
    return 'This action adds a new paymentDate';
  }

  findAll() {
    return `This action returns all paymentDates`;
  }

  findOne(id: number) {
    return `This action returns a #${id} paymentDate`;
  }

  update(id: number, updatePaymentDateDto: UpdatePaymentDateDto) {
    return `This action updates a #${id} paymentDate`;
  }

  remove(id: number) {
    return `This action removes a #${id} paymentDate`;
  }
}
