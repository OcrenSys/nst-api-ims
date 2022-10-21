import { PartialType } from '@nestjs/mapped-types';
import { IsDate } from 'class-validator';
import { CreateBannerDto } from './create-banner.dto';

export class UpdateBannerDto extends PartialType(CreateBannerDto) {
  @IsDate()
  updatedAt: string;
}
