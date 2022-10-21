import { PartialType } from '@nestjs/mapped-types';
import { IsDate } from 'class-validator';
import { CreateImageDto } from './create-image.dto';

export class UpdateImageDto extends PartialType(CreateImageDto) {
  @IsDate()
  updatedAt: string;
}
