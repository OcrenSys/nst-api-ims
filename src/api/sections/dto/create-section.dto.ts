import {
  IsArray,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Product } from 'src/api/products/entities/product.entity';
import * as NUMBER from '../../../common/constants/numbers.constants';

export class CreateSectionDto {
  @IsString()
  @MaxLength(NUMBER.N50, {
    message: `El nombre del Banner no puede ser mayor a ${NUMBER.N50} caracteres.`,
  })
  @MinLength(NUMBER.N02, {
    message: `El nombrel Banner debe contener almenos ${NUMBER.N02} caracteres.`,
  })
  name: string;

  @IsArray()
  @IsOptional()
  products?: Product[];
}
