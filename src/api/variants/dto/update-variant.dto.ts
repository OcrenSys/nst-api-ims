import { PartialType } from '@nestjs/mapped-types';
import { CreateVariantDto } from './create-variant.dto';
import { IsInt } from 'class-validator';

export class UpdateVariantDto extends PartialType(CreateVariantDto) {
  @IsInt()
  id: number;
}
