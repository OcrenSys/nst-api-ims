import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PaymentDatesService } from './payment-dates.service';
import { CreatePaymentDateDto } from './dto/create-payment-date.dto';
import { UpdatePaymentDateDto } from './dto/update-payment-date.dto';
import { Roles } from '../../decorators/role.decorator';
import { RoleEnum } from '../../common/enums/roles.enum';

@Controller('payment-dates')
export class PaymentDatesController {
  constructor(private readonly paymentDatesService: PaymentDatesService) {}

  @Post()
  @Roles(RoleEnum.Admin, RoleEnum.Sales)
  create(@Body() createPaymentDateDto: CreatePaymentDateDto) {
    return this.paymentDatesService.create(createPaymentDateDto);
  }

  @Get()
  @Roles(RoleEnum.Admin, RoleEnum.Sales)
  findAll() {
    return this.paymentDatesService.findAll();
  }

  @Get(':id')
  @Roles(RoleEnum.Admin, RoleEnum.Sales)
  findOne(@Param('id') id: string) {
    return this.paymentDatesService.findOne(+id);
  }

  @Patch(':id')
  @Roles(RoleEnum.Admin)
  update(
    @Param('id') id: string,
    @Body() updatePaymentDateDto: UpdatePaymentDateDto,
  ) {
    return this.paymentDatesService.update(+id, updatePaymentDateDto);
  }

  @Delete(':id')
  @Roles(RoleEnum.Admin)
  remove(@Param('id') id: string) {
    return this.paymentDatesService.remove(+id);
  }
}
