import { IsDate, IsInt, IsObject, Max, Min } from 'class-validator';
import { Credit } from '../../../api/credits/entities/credit.entity';
import { PaymentDate } from '../../../api/payment-dates/entities/payment-date.entity';
import * as NUMBER from '../../../common/constants/numbers.constants';

export class CreatePaymentDto {
  @IsDate()
  date: string;

  @IsInt()
  @Min(NUMBER.MIN, {
    message: `El monto del pago debe ser un numero entero mayor o igual a ${NUMBER.MIN}`,
  })
  @Max(NUMBER.MAX, {
    message: `El monto del pago debe ser un monto real, menor a ${NUMBER.MAX}`,
  })
  amount: number;

  @IsObject()
  credit: Credit;

  @IsObject()
  paymentDate: PaymentDate;
}
