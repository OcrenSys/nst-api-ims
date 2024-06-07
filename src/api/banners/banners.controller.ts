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
import { BannersService } from './banners.service';
import { CreateBannerDto } from './dto/create-banner.dto';
import { UpdateBannerDto } from './dto/update-banner.dto';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Banners')
@ApiBearerAuth()
@Controller('banners')
export class BannersController {
  constructor(private readonly bannersService: BannersService) {}

  @Post()
  @Auth(RoleEnum.Admin)
  create(@Body() createBannerDto: CreateBannerDto) {
    return this.bannersService.create(createBannerDto);
  }

  @Get()
  findAll() {
    return this.bannersService.findAll();
  }

  @Get('public')
  findAllPublic() {
    return this.bannersService.findAll();
  }

  @Get('public/:id')
  findOnePublic(@Param('id') id: string) {
    return this.bannersService.findOne(+id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bannersService.findOne(+id);
  }

  @Patch(':id')
  @Auth(RoleEnum.Admin)
  update(@Param('id') id: string, @Body() updateBannerDto: UpdateBannerDto) {
    return this.bannersService.update(+id, updateBannerDto);
  }

  @Delete(':id')
  @Auth(RoleEnum.Admin)
  remove(@Param('id') id: string) {
    return this.bannersService.remove(+id);
  }
}
