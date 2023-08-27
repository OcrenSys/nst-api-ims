import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { RoleEnum } from '../../common/enums/roles.enum';
import { Auth } from '../../common/decorators/auth.decorator';

@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Post()
  @Auth(RoleEnum.Admin)
  create(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customersService.create(createCustomerDto);
  }

  @Get()
  @Auth(RoleEnum.Admin, RoleEnum.Sales)
  findAll(@Query() query: unknown) {
    return this.customersService.findAll(query);
  }

  @Get(':id')
  @Auth(RoleEnum.Admin, RoleEnum.Sales)
  findOne(@Param('id') id: string) {
    return this.customersService.findOne(+id);
  }

  @Patch(':id')
  @Auth(RoleEnum.Admin)
  update(
    @Param('id') id: string,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ) {
    return this.customersService.update(+id, updateCustomerDto);
  }

  @Delete(':id')
  @Auth(RoleEnum.Admin)
  remove(@Param('id') id: string) {
    return this.customersService.remove(+id);
  }
}
