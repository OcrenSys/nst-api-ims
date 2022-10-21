import {
  IsArray,
  IsBoolean,
  IsObject,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Credit } from '../../../api/credits/entities/credit.entity';
import { Customer } from '../../../api/customers/entities/customer.entity';
import { InvoicesDetail } from '../../../api/invoices-details/entities/invoices-detail.entity';
import { Member } from '../../../api/members/entities/member.entity';
import * as NUMBER from '../../../common/constants/numbers.constants';

export class CreateInvoiceDto {
  @IsBoolean()
  isAnulated: boolean;

  @IsBoolean()
  isCompleted: boolean;

  @IsString()
  @IsOptional()
  @MaxLength(NUMBER.N50, {
    message: `El comentario de la factura no puede ser mayor a ${NUMBER.N50} caracteres.`,
  })
  @MinLength(NUMBER.N02, {
    message: `El comentario de la factura debe contener almenos ${NUMBER.N02} caracteres.`,
  })
  comment?: string;

  @IsObject()
  @IsOptional()
  credit?: Credit;

  @IsArray()
  invoiceDetails: InvoicesDetail[];

  @IsObject()
  @IsOptional()
  customer?: Customer;

  @IsObject()
  member: Member;
}
