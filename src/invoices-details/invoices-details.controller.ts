import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InvoicesDetailsService } from './invoices-details.service';
import { CreateInvoicesDetailDto } from './dto/create-invoices-detail.dto';
import { UpdateInvoicesDetailDto } from './dto/update-invoices-detail.dto';

@Controller('invoices-details')
export class InvoicesDetailsController {
  constructor(private readonly invoicesDetailsService: InvoicesDetailsService) {}

  @Post()
  create(@Body() createInvoicesDetailDto: CreateInvoicesDetailDto) {
    return this.invoicesDetailsService.create(createInvoicesDetailDto);
  }

  @Get()
  findAll() {
    return this.invoicesDetailsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.invoicesDetailsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInvoicesDetailDto: UpdateInvoicesDetailDto) {
    return this.invoicesDetailsService.update(+id, updateInvoicesDetailDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.invoicesDetailsService.remove(+id);
  }
}
