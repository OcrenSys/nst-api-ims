import { IsDate, IsInt, IsObject, Max, Min } from 'class-validator';
import { Credit } from '../../../database/models/credit.entity';
import { Payment } from '../../../database/models/payment.entity';
import * as NUMBER from '../../../common/constants/numbers.constants';

export class CreatePaymentDateDto {
  @IsInt()
  @Min(NUMBER.N00, {
    message: `El monto de la fecha de pago debe ser un numero entero mayor o igual a ${NUMBER.N00}`,
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
