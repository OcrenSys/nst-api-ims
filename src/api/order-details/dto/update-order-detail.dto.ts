import { PartialType } from '@nestjs/mapped-types';
import { CreateOrdersDetailDto } from './create-order-detail.dto';

export class UpdateOrdersDetailDto extends PartialType(
  CreateOrdersDetailDto,
) {}
