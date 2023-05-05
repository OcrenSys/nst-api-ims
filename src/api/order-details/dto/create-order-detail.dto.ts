import {
  IsInt,
  IsNumber,
  IsObject,
  IsOptional,
  Max,
  Min,
} from 'class-validator';
import { Order } from '../../../database/models/order.entity';
import { Product } from '../../../database/models/product.entity';
import { Variant } from '../../../database/models/variant.entity';
import * as NUMBER from '../../../common/constants/numbers.constants';

export class CreateOrdersDetailDto {
  @IsNumber()
  @Min(NUMBER.N00, {
    message: `El precio del producto debe ser un numero entero mayor o igual a ${NUMBER.N00}`,
  })
  @Max(NUMBER.MAX, {
    message: `El precio del producto debe ser un monto real, menor a ${NUMBER.MAX}`,
  })
  price: number;

  @IsNumber()
  @Min(NUMBER.N00, {
    message: `El costo del producto debe ser un numero entero mayor o igual a ${NUMBER.N00}`,
  })
  @Max(NUMBER.MAX, {
    message: `El costo del producto debe ser un monto real, menor a ${NUMBER.MAX}`,
  })
  cost: number;

  @IsInt()
  @Min(NUMBER.N00, {
    message: `La cantidad del producto debe ser un numero entero mayor o igual a ${NUMBER.N00}`,
  })
  @Max(NUMBER.MAX, {
    message: `ElLa cantidad del producto debe ser un monto real, menor a ${NUMBER.MAX}`,
  })
  amount: number;

  @IsOptional()
  @IsObject()
  order: Order;

  @IsOptional()
  @IsObject()
  product: Product;

  @IsObject()
  @IsObject()
  variant?: Variant;
}
