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
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Order Details')
@ApiBearerAuth()
@Controller('orders-details')
export class OrdersDetailsController {
  constructor(private readonly ordersDetailsService: OrdersDetailsService) {}

  @Post()
  @Auth(RoleEnum.Admin, RoleEnum.Sales)
  create(@Body() createordersDetailDto: CreateOrdersDetailDto) {
    return this.ordersDetailsService.create(createordersDetailDto);
  }

  @Get()
  @Auth(RoleEnum.Admin, RoleEnum.Sales)
  findAll() {
    return this.ordersDetailsService.findAll();
  }

  @Get(':id')
  @Auth(RoleEnum.Admin, RoleEnum.Sales)
  findOne(@Param('id') id: string) {
    return this.ordersDetailsService.findOne(+id);
  }

  @Patch(':id')
  @Auth(RoleEnum.Admin)
  update(
    @Param('id') id: string,
    @Body() updateordersDetailDto: UpdateOrdersDetailDto,
  ) {
    return this.ordersDetailsService.update(+id, updateordersDetailDto);
  }

  @Delete(':id')
  @Auth(RoleEnum.Admin)
  remove(@Param('id') id: string) {
    return this.ordersDetailsService.remove(+id);
  }
}
