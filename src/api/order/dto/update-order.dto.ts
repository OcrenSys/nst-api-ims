import { PartialType } from '@nestjs/mapped-types';
import { CreateorderDto } from './create-order.dto';

export class UpdateorderDto extends PartialType(CreateorderDto) {}
