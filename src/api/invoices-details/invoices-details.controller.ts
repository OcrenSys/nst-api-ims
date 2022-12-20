import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { InvoicesDetailsService } from './invoices-details.service';
import { CreateInvoicesDetailDto } from './dto/create-invoices-detail.dto';
import { UpdateInvoicesDetailDto } from './dto/update-invoices-detail.dto';
import { RoleEnum } from '../../common/enums/roles.enum';
import { Auth } from '../../common/decorators/auth.decorator';

@Controller('invoices-details')
export class InvoicesDetailsController {
  constructor(
    private readonly invoicesDetailsService: InvoicesDetailsService,
  ) {}

  @Post()
  @Auth(RoleEnum.Admin, RoleEnum.Sales)
  create(@Body() createInvoicesDetailDto: CreateInvoicesDetailDto) {
    return this.invoicesDetailsService.create(createInvoicesDetailDto);
  }

  @Get()
  @Auth(RoleEnum.Admin, RoleEnum.Sales)
  findAll() {
    return this.invoicesDetailsService.findAll();
  }

  @Get(':id')
  @Auth(RoleEnum.Admin, RoleEnum.Sales)
  findOne(@Param('id') id: string) {
    return this.invoicesDetailsService.findOne(+id);
  }

  @Patch(':id')
  @Auth(RoleEnum.Admin)
  update(
    @Param('id') id: string,
    @Body() updateInvoicesDetailDto: UpdateInvoicesDetailDto,
  ) {
    return this.invoicesDetailsService.update(+id, updateInvoicesDetailDto);
  }

  @Delete(':id')
  @Auth(RoleEnum.Admin)
  remove(@Param('id') id: string) {
    return this.invoicesDetailsService.remove(+id);
  }
}
