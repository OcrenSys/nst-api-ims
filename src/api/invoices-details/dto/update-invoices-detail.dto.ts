import { PartialType } from '@nestjs/mapped-types';
import { CreateInvoicesDetailDto } from './create-invoices-detail.dto';

export class UpdateInvoicesDetailDto extends PartialType(
  CreateInvoicesDetailDto,
) {}
