import { PartialType } from '@nestjs/mapped-types';
import { IsDate, IsInt } from 'class-validator';
import { CreateBrandDto } from './create-brand.dto';

export class UpdateBrandDto extends PartialType(CreateBrandDto) {
  @IsInt()
  id: number;

  @IsDate()
  updatedAt: string;
}
