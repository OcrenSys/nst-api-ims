import {
  IsArray,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  Length,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import * as NUMBER from '../../../common/constants/numbers.constants';
import { Image } from '../../images/entities/image.entity';
import { SubCategory } from '../../sub-categories/entities/sub-category.entity';
import { Banner } from '../../banners/entities/banner.entity';

export class CreateCategoryDto {
  @IsString()
  @MaxLength(NUMBER.N50, {
    message: `El nombre de la variante no puede ser mayor a ${NUMBER.N50} caracteres.`,
  })
  @MinLength(NUMBER.N02, {
    message: `El nombre de variante debe contener almenos ${NUMBER.N02} caracteres.`,
  })
  name: string;

  @Length(NUMBER.MIN, NUMBER.N200)
  @IsOptional()
  description?: string;

  @IsNumber()
  @IsOptional()
  @Min(NUMBER.MIN, {
    message: `El precio de credito de la variante debe ser un numero entero mayor o igual a ${NUMBER.MIN}`,
  })
  order?: number;

  @IsArray()
  @IsOptional()
  image?: Image;

  @IsOptional()
  @IsObject()
  subCategories?: SubCategory[];

  @IsOptional()
  @IsObject()
  banner?: Banner;
}
