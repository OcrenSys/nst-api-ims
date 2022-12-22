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
import { Banner } from '../../../database/models/banner.entity';
import { Brand } from '../../../database/models/brand.entity';
import { Image } from '../../../database/models/image.entity';
import { OrderDetail } from '../../../database/models/order-detail.entity';
import { Section } from '../../../database/models/section.entity';
import { SubCategory } from '../../../database/models/sub-category.entity';
import { Variant } from '../../../database/models/variant.entity';
import * as NUMBER from '../../../common/constants/numbers.constants';

export class CreateProductDto {
  @Length(NUMBER.N02, NUMBER.N50)
  code: string;

  @IsString()
  @MaxLength(NUMBER.N50, {
    message: `El nombre de producto no puede ser mayor a ${NUMBER.N50} caracteres.`,
  })
  @MinLength(NUMBER.N02, {
    message: `El nombre de producto debe contener almenos ${NUMBER.N02} caracteres.`,
  })
  name: string;

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
    message: `El precio de credito del producto debe ser un numero entero mayor o igual a ${NUMBER.MIN}`,
  })
  @Max(NUMBER.MAX, {
    message: `El precio de credito del producto debe ser un monto real, menor a ${NUMBER.MAX}`,
  })
  priceCredit: number;

  @IsNumber()
  @Min(NUMBER.MIN, {
    message: `El costo del producto debe ser un numero entero mayor o igual a ${NUMBER.MIN}`,
  })
  @Max(NUMBER.MAX, {
    message: `El costo del producto debe ser un monto real, menor a ${NUMBER.MAX}`,
  })
  cost: number;

  @Length(NUMBER.MIN, NUMBER.N200)
  @IsOptional()
  description?: string;

  @IsInt()
  @Min(NUMBER.MIN, {
    message: `El stock del producto debe ser un numero entero mayor o igual a ${NUMBER.MIN}`,
  })
  @Max(NUMBER.MAX, {
    message: `El stock del producto debe ser un monto real, menor a ${NUMBER.MAX}`,
  })
  stock: number;

  @IsInt()
  @Min(NUMBER.MIN)
  @IsOptional()
  order?: number;

  @IsBoolean()
  @IsOptional()
  isPublished?: boolean;

  @IsArray()
  @IsOptional()
  images?: Image[];

  @IsArray()
  @IsOptional()
  variants?: Variant[];

  @IsOptional()
  @IsObject()
  orderDetail?: OrderDetail;

  @IsOptional()
  @IsObject()
  subCategory?: SubCategory;

  @IsOptional()
  @IsObject()
  brand?: Brand;

  @IsOptional()
  @IsObject()
  section?: Section;

  @IsOptional()
  @IsObject()
  banner?: Banner;
}
