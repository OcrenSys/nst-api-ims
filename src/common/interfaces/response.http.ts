import { HttpStatus } from '@nestjs/common';

export interface ResponseHttp {
  statusCode: HttpStatus;
  timestamp: string;
  error?: any;
  data?: any;
  message?: string;
}
