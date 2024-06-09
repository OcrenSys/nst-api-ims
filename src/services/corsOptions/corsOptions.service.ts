import { Injectable } from '@nestjs/common';
import {
  CorsOptions,
  CorsOptionsDelegate,
} from '@nestjs/common/interfaces/external/cors-options.interface';

@Injectable()
export class CorsOptionsService {
  getCorsOptions(): CorsOptions | CorsOptionsDelegate<any> {
    return {
      origin: process.env.ORIGIN,
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      credentials: true,
      allowedHeaders: 'Content-Type, Authorization',
      optionsSuccessStatus: 204,
      preflightContinue: false,
    };
  }
}
