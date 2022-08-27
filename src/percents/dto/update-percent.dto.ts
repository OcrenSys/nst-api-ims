import { PartialType } from '@nestjs/mapped-types';
import { CreatePercentDto } from './create-percent.dto';

export class UpdatePercentDto extends PartialType(CreatePercentDto) {}
