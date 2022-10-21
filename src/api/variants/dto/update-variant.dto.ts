import { PartialType } from '@nestjs/mapped-types';
import { IsInt } from 'class-validator';
import { CreateVariantDto } from './create-variant.dto';

export class UpdateVariantDto extends PartialType(CreateVariantDto) {
  @IsInt()
  id: number;
}
