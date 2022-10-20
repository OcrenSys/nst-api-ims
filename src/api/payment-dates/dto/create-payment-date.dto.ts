import { IsDate, IsInt, IsObject, Max, Min } from 'class-validator';
import { Credit } from 'src/api/credits/entities/credit.entity';
import { Payment } from 'src/api/payments/entities/payment.entity';
import * as NUMBER from '../../../common/constants/numbers.constants';

export class CreatePaymentDateDto {
  @IsInt()
  @Min(NUMBER.MIN, {
    message: `El monto de la fecha de pago debe ser un numero entero mayor o igual a ${NUMBER.MIN}`,
  })
  @Max(NUMBER.MAX, {
    message: `El monto de la fecha de pago debe ser un monto real, menor a ${NUMBER.MAX}`,
  })
  amount: number;

  @IsDate()
  date: string;

  @IsObject()
  credit: Credit;

  @IsObject()
  payment: Payment;
}
