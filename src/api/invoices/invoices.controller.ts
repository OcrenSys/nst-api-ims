import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { InvoicesService } from './invoices.service';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { Roles } from '../../decorators/role.decorator';
import { RoleEnum } from '../../common/enums/roles.enum';

@Controller('invoices')
export class InvoicesController {
  constructor(private readonly invoicesService: InvoicesService) {}

  @Post()
  @Roles(RoleEnum.Admin, RoleEnum.Sales)
  create(@Body() createInvoiceDto: CreateInvoiceDto) {
    return this.invoicesService.create(createInvoiceDto);
  }

  @Get()
  @Roles(RoleEnum.Admin, RoleEnum.Sales)
  findAll() {
    return this.invoicesService.findAll();
  }

  @Get(':id')
  @Roles(RoleEnum.Admin, RoleEnum.Sales)
  findOne(@Param('id') id: string) {
    return this.invoicesService.findOne(+id);
  }

  @Patch(':id')
  @Roles(RoleEnum.Admin)
  update(@Param('id') id: string, @Body() updateInvoiceDto: UpdateInvoiceDto) {
    return this.invoicesService.update(+id, updateInvoiceDto);
  }

  @Delete(':id')
  @Roles(RoleEnum.Admin)
  remove(@Param('id') id: string) {
    return this.invoicesService.remove(+id);
  }
}
