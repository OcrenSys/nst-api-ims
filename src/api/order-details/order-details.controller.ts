import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OrdersDetailsService } from './order-details.service';
import { CreateOrdersDetailDto } from './dto/create-order-detail.dto';
import { UpdateOrdersDetailDto } from './dto/update-order-detail.dto';
import { RoleEnum } from '../../common/enums/roles.enum';
import { Auth } from '../../common/decorators/auth.decorator';

@Controller('invoices-details')
export class OrdersDetailsController {
  constructor(
    private readonly invoicesDetailsService: OrdersDetailsService,
  ) {}

  @Post()
  @Auth(RoleEnum.Admin, RoleEnum.Sales)
  create(@Body() createInvoicesDetailDto: CreateOrdersDetailDto) {
    return this.invoicesDetailsService.create(createInvoicesDetailDto);
  }

  @Get()
  @Auth(RoleEnum.Admin, RoleEnum.Sales)
  findAll() {
    return this.invoicesDetailsService.findAll();
  }

  @Get(':id')
  @Auth(RoleEnum.Admin, RoleEnum.Sales)
  findOne(@Param('id') id: string) {
    return this.invoicesDetailsService.findOne(+id);
  }

  @Patch(':id')
  @Auth(RoleEnum.Admin)
  update(
    @Param('id') id: string,
    @Body() updateInvoicesDetailDto: UpdateOrdersDetailDto,
  ) {
    return this.invoicesDetailsService.update(+id, updateInvoicesDetailDto);
  }

  @Delete(':id')
  @Auth(RoleEnum.Admin)
  remove(@Param('id') id: string) {
    return this.invoicesDetailsService.remove(+id);
  }
}
