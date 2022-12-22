import { IsDecimal, IsInt, IsObject, IsOptional } from 'class-validator';
import { Credit } from '../../../database/models/credit.entity';

export class CreatePercentDto {
  @IsInt()
  fee: number;

  @IsDecimal()
  rate: number;

  @IsObject()
  @IsOptional()
  credits?: Credit[];
}
