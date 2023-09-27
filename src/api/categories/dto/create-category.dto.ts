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
import { Image } from '../../../database/models/image.entity';
import { SubCategory } from '../../../database/models/sub-category.entity';
import { Banner } from '../../../database/models/banner.entity';

export class CreateCategoryDto {
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
  @IsOptional()
  @Min(NUMBER.N00, {
    message: `El precio de credito de la variante debe ser un numero entero mayor o igual a ${NUMBER.N00}`,
  })
  order?: number;

  @IsOptional()
  @IsObject()
  image?: Image;

  @IsOptional()
  @IsArray()
  subCategories?: SubCategory[];

  @IsOptional()
  @IsObject()
  banner?: Banner;
}
