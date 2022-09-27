import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PaymentDatesService } from './payment-dates.service';
import { CreatePaymentDateDto } from './dto/create-payment-date.dto';
import { UpdatePaymentDateDto } from './dto/update-payment-date.dto';

@Controller('payment-dates')
export class PaymentDatesController {
  constructor(private readonly paymentDatesService: PaymentDatesService) {}

  @Post()
  create(@Body() createPaymentDateDto: CreatePaymentDateDto) {
    return this.paymentDatesService.create(createPaymentDateDto);
  }

  @Get()
  findAll() {
    return this.paymentDatesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.paymentDatesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePaymentDateDto: UpdatePaymentDateDto) {
    return this.paymentDatesService.update(+id, updatePaymentDateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.paymentDatesService.remove(+id);
  }
}
