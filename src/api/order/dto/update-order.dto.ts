import { PartialType } from '@nestjs/mapped-types';
import { CreateInvoiceDto } from './create-order.dto';

export class UpdateInvoiceDto extends PartialType(CreateInvoiceDto) {}
