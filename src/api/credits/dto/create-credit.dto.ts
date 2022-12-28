import {
  IsArray,
  IsBoolean,
  IsDecimal,
  IsObject,
  IsOptional,
  Min,
} from 'class-validator';
import { Order } from '../../../database/models/order.entity';
import { PaymentDate } from '../../../database/models/payment-date.entity';
import { Payment } from '../../../database/models/payment.entity';
import { Percent } from '../../../database/models/percent.entity';
import * as NUMBER from '../../../common/constants/numbers.constants';

export class CreateCreditDto {
  @IsDecimal()
  @Min(NUMBER.N00, {
    message: `El monto de la cuota debe ser un numero entero mayor o igual a ${NUMBER.N00}`,
  })
  fee: number;

  @IsDecimal()
  @Min(NUMBER.N00, {
    message: `La tasa de interes debe ser un numero entero mayor o igual a ${NUMBER.N00}`,
  })
  rate: number;

  @IsBoolean()
  @IsOptional()
  isExonerated?: boolean;

  @IsArray()
  @IsOptional()
  payments?: Payment[];

  @IsArray()
  @IsOptional()
  paymentDates?: PaymentDate[];

  @IsObject()
  @IsOptional()
  percent: Percent;

  @IsObject()
  @IsOptional()
  order?: Order;
}
