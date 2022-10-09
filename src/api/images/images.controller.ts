import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ImagesService } from './images.service';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { Roles } from '../../decorators/role.decorator';
import { RoleEnum } from '../../common/enums/roles.enum';

@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Post()
  @Roles(RoleEnum.Admin, RoleEnum.Sales)
  create(@Body() createImageDto: CreateImageDto) {
    return this.imagesService.create(createImageDto);
  }

  @Get()
  @Roles(RoleEnum.Admin, RoleEnum.Sales)
  findAll() {
    return this.imagesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.imagesService.findOne(+id);
  }

  @Patch(':id')
  @Roles(RoleEnum.Admin, RoleEnum.Sales)
  update(@Param('id') id: string, @Body() updateImageDto: UpdateImageDto) {
    return this.imagesService.update(+id, updateImageDto);
  }

  @Delete(':id')
  @Roles(RoleEnum.Admin, RoleEnum.Sales)
  remove(@Param('id') id: string) {
    return this.imagesService.remove(+id);
  }
}
