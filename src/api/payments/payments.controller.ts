import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { Roles } from '../../decorators/role.decorator';
import { RoleEnum } from '../../common/enums/roles.enum';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post()
  @Roles(RoleEnum.Admin, RoleEnum.Sales)
  create(@Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentsService.create(createPaymentDto);
  }

  @Get()
  @Roles(RoleEnum.Admin, RoleEnum.Sales)
  findAll() {
    return this.paymentsService.findAll();
  }

  @Get(':id')
  @Roles(RoleEnum.Admin, RoleEnum.Sales)
  findOne(@Param('id') id: string) {
    return this.paymentsService.findOne(+id);
  }

  @Patch(':id')
  @Roles(RoleEnum.Admin)
  update(@Param('id') id: string, @Body() updatePaymentDto: UpdatePaymentDto) {
    return this.paymentsService.update(+id, updatePaymentDto);
  }

  @Delete(':id')
  @Roles(RoleEnum.Admin)
  remove(@Param('id') id: string) {
    return this.paymentsService.remove(+id);
  }
}
