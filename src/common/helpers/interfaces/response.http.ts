import { HttpStatus } from '@nestjs/common';

export interface ResponseHttp {
  status: HttpStatus;
  error?: any;
  data?: any;
  message?: string;
}
