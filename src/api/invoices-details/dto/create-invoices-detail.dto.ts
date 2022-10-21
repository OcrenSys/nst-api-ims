import {
  IsInt,
  IsNumber,
  IsObject,
  IsOptional,
  Max,
  Min,
} from 'class-validator';
import { Invoice } from '../../invoices/entities/invoice.entity';
import { Product } from '../../products/entities/product.entity';
import { Variant } from '../../variants/entities/variant.entity';
import * as NUMBER from '../../../common/constants/numbers.constants';

export class CreateInvoicesDetailDto {
  @IsNumber()
  @Min(NUMBER.MIN, {
    message: `El precio del producto debe ser un numero entero mayor o igual a ${NUMBER.MIN}`,
  })
  @Max(NUMBER.MAX, {
    message: `El precio del producto debe ser un monto real, menor a ${NUMBER.MAX}`,
  })
  price: number;

  @IsNumber()
  @Min(NUMBER.MIN, {
    message: `El costo del producto debe ser un numero entero mayor o igual a ${NUMBER.MIN}`,
  })
  @Max(NUMBER.MAX, {
    message: `El costo del producto debe ser un monto real, menor a ${NUMBER.MAX}`,
  })
  cost: number;

  @IsInt()
  @Min(NUMBER.MIN, {
    message: `La cantidad del producto debe ser un numero entero mayor o igual a ${NUMBER.MIN}`,
  })
  @Max(NUMBER.MAX, {
    message: `ElLa cantidad del producto debe ser un monto real, menor a ${NUMBER.MAX}`,
  })
  amount: number;

  @IsOptional()
  @IsObject()
  invoice: Invoice;

  @IsOptional()
  @IsObject()
  product: Product;

  @IsObject()
  @IsObject()
  variant?: Variant;
}
