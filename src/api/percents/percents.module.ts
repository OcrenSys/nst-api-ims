import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HandleExceptions } from '../../common/helpers/handle.exceptions';
import { PercentsService } from './percents.service';
import { PercentsController } from './percents.controller';
import { Percent } from './entities/percent.entity';
import { Credit } from '../credits/entities/credit.entity';

@Module({
  controllers: [PercentsController],
  providers: [PercentsService, HandleExceptions],
  imports: [TypeOrmModule.forFeature([Percent, Credit])],
})
export class PercentsModule {}
