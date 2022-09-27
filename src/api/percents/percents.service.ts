import { Injectable } from '@nestjs/common';
import { CreatePercentDto } from './dto/create-percent.dto';
import { UpdatePercentDto } from './dto/update-percent.dto';

@Injectable()
export class PercentsService {
  create(createPercentDto: CreatePercentDto) {
    return 'This action adds a new percent';
  }

  findAll() {
    return `This action returns all percents`;
  }

  findOne(id: number) {
    return `This action returns a #${id} percent`;
  }

  update(id: number, updatePercentDto: UpdatePercentDto) {
    return `This action updates a #${id} percent`;
  }

  remove(id: number) {
    return `This action removes a #${id} percent`;
  }
}
