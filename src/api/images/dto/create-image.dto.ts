import {
  IsObject,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Banner } from '../../../api/banners/entities/banner.entity';
import { Category } from '../../../api/categories/entities/category.entity';
import { Product } from '../../../api/products/entities/product.entity';
import { SubCategory } from '../../../api/sub-categories/entities/sub-category.entity';
import { Variant } from '../../../api/variants/entities/variant.entity';
import * as NUMBER from '../../../common/constants/numbers.constants';

export class CreateImageDto {
  @IsString()
  @MaxLength(NUMBER.N200, {
    message: `El nombre de la variante no puede ser mayor a ${NUMBER.N50} caracteres.`,
  })
  @MinLength(NUMBER.N02, {
    message: `El nombre de variante debe contener almenos ${NUMBER.N02} caracteres.`,
  })
  url: string;

  @IsObject()
  @IsOptional()
  product?: Product;

  @IsObject()
  @IsOptional()
  variant?: Variant;

  @IsObject()
  @IsOptional()
  banner?: Banner;

  @IsObject()
  @IsOptional()
  category?: Category;

  @IsObject()
  @IsOptional()
  subCategory?: SubCategory;
}
