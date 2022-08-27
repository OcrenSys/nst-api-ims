import { PartialType } from '@nestjs/mapped-types';
import { CreatePaymentDateDto } from './create-payment-date.dto';

export class UpdatePaymentDateDto extends PartialType(CreatePaymentDateDto) {}
