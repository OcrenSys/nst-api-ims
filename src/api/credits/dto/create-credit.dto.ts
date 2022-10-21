import {
  IsArray,
  IsBoolean,
  IsDecimal,
  IsObject,
  IsOptional,
  Min,
} from 'class-validator';
import { Invoice } from '../../../api/invoices/entities/invoice.entity';
import { PaymentDate } from '../../../api/payment-dates/entities/payment-date.entity';
import { Payment } from '../../../api/payments/entities/payment.entity';
import { Percent } from '../../../api/percents/entities/percent.entity';
import * as NUMBER from '../../../common/constants/numbers.constants';

export class CreateCreditDto {
  @IsDecimal()
  @Min(NUMBER.MIN, {
    message: `El monto de la cuota debe ser un numero entero mayor o igual a ${NUMBER.MIN}`,
  })
  fee: number;

  @IsDecimal()
  @Min(NUMBER.MIN, {
    message: `La tasa de interes debe ser un numero entero mayor o igual a ${NUMBER.MIN}`,
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
  invoice?: Invoice;
}
