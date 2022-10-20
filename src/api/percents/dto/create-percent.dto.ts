import { IsDecimal, IsInt, IsObject, IsOptional } from 'class-validator';
import { Credit } from 'src/api/credits/entities/credit.entity';

export class CreatePercentDto {
  @IsInt()
  fee: number;

  @IsDecimal()
  rate: number;

  @IsObject()
  @IsOptional()
  credits?: Credit[];
}
