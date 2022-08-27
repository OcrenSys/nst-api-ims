import { Injectable } from '@nestjs/common';
import { CreateInvoicesDetailDto } from './dto/create-invoices-detail.dto';
import { UpdateInvoicesDetailDto } from './dto/update-invoices-detail.dto';

@Injectable()
export class InvoicesDetailsService {
  create(createInvoicesDetailDto: CreateInvoicesDetailDto) {
    return 'This action adds a new invoicesDetail';
  }

  findAll() {
    return `This action returns all invoicesDetails`;
  }

  findOne(id: number) {
    return `This action returns a #${id} invoicesDetail`;
  }

  update(id: number, updateInvoicesDetailDto: UpdateInvoicesDetailDto) {
    return `This action updates a #${id} invoicesDetail`;
  }

  remove(id: number) {
    return `This action removes a #${id} invoicesDetail`;
  }
}
