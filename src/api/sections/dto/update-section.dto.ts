import { PartialType } from '@nestjs/mapped-types';
import { IsDate } from 'class-validator';
import { CreateSectionDto } from './create-section.dto';

export class UpdateSectionDto extends PartialType(CreateSectionDto) {
  @IsDate()
  updatedAt: string;
}
