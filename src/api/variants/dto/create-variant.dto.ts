import {
  IsArray,
  IsBoolean,
  IsInt,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  Length,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { Brand } from '../../../database/models/brand.entity';
import { Image } from '../../../database/models/image.entity';
import { Product } from '../../../database/models/product.entity';
import { OrderDetail } from '../../../database/models/order-detail.entity';
import * as NUMBER from '../../../common/constants/numbers.constants';

export class CreateVariantDto {
  @Length(NUMBER.N02, NUMBER.N50)
  code: string;

  @IsString()
  @MaxLength(NUMBER.N50, {
    message: `El nombre de la variante no puede ser mayor a ${NUMBER.N50} caracteres.`,
  })
  @MinLength(NUMBER.N02, {
    message: `El nombre de variante debe contener almenos ${NUMBER.N02} caracteres.`,
  })
  name: string;

  @Length(NUMBER.N00, NUMBER.N200)
  @IsOptional()
  description?: string;

  @IsNumber()
  @Min(NUMBER.N00, {
    message: `El precio de credito de la variante debe ser un numero entero mayor o igual a ${NUMBER.N00}`,
  })
  @Max(NUMBER.MAX, {
    message: `El precio de credito de la variante debe ser un monto real, menor a ${NUMBER.MAX}`,
  })
  price: number;

  @IsNumber()
  @Min(NUMBER.N00, {
    message: `El precio de credito de la variante debe ser un numero entero mayor o igual a ${NUMBER.N00}`,
  })
  @Max(NUMBER.MAX, {
    message: `El precio de credito de la variante debe ser un monto real, menor a ${NUMBER.MAX}`,
  })
  priceCredit: number;

  @IsNumber()
  @Min(NUMBER.N00, {
    message: `El precio de credito de la variante debe ser un numero entero mayor o igual a ${NUMBER.N00}`,
  })
  @Max(NUMBER.MAX, {
    message: `El precio de credito de la variante debe ser un monto real, menor a ${NUMBER.MAX}`,
  })
  cost: number;

  @IsInt()
  @Min(NUMBER.N00, {
    message: `El precio de credito de la variante debe ser un numero entero mayor o igual a ${NUMBER.N00}`,
  })
  @Max(NUMBER.MAX, {
    message: `El precio de credito de la variante debe ser un monto real, menor a ${NUMBER.MAX}`,
  })
  stock: number;

  @IsNumber()
  @Min(NUMBER.N00, {
    message: `El precio de credito de la variante debe ser un numero entero mayor o igual a ${NUMBER.N00}`,
  })
  order?: number;

  @IsBoolean()
  @IsOptional()
  isPublished?: boolean;

  @IsOptional()
  @IsObject()
  orderDetail?: OrderDetail;

  @IsArray()
  @IsOptional()
  images?: Image[];

  @IsOptional()
  @IsObject()
  product?: Product;

  @IsOptional()
  @IsObject()
  brand?: Brand;
}
