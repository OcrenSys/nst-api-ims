import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { Auth } from '../../common/decorators/auth.decorator';
import { RoleEnum } from '../../common/enums/roles.enum';
import { CreditsService } from './credits.service';
import { CreateCreditDto } from './dto/create-credit.dto';
import { UpdateCreditDto } from './dto/update-credit.dto';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Credits')
@ApiBearerAuth()
@Controller('credits')
export class CreditsController {
  constructor(private readonly creditsService: CreditsService) {}

  @Post()
  @Auth(RoleEnum.Admin, RoleEnum.Sales)
  create(@Body() createCreditDto: CreateCreditDto) {
    return this.creditsService.create(createCreditDto);
  }

  @Get()
  @Auth(RoleEnum.Admin, RoleEnum.Sales)
  findAll() {
    return this.creditsService.findAll();
  }

  @Get(':id')
  @Auth(RoleEnum.Admin, RoleEnum.Sales)
  findOne(@Param('id') id: string) {
    return this.creditsService.findOne(+id);
  }

  @Patch(':id')
  @Auth(RoleEnum.Admin)
  update(@Param('id') id: string, @Body() updateCreditDto: UpdateCreditDto) {
    return this.creditsService.update(+id, updateCreditDto);
  }

  @Delete(':id')
  @Auth(RoleEnum.Admin)
  remove(@Param('id') id: string) {
    return this.creditsService.remove(+id);
  }
}
