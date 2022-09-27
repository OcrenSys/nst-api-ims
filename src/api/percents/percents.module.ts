import { Module } from '@nestjs/common';
import { PercentsService } from './percents.service';
import { PercentsController } from './percents.controller';

@Module({
  controllers: [PercentsController],
  providers: [PercentsService]
})
export class PercentsModule {}
