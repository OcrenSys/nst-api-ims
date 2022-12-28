import {
  Logger,
  HttpStatus,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
  Injectable,
  HttpException,
} from '@nestjs/common';
import { ResponseHttp } from './interfaces/response.http';

@Injectable()
export class HandleExceptions {
  private readonly logger = new Logger('Logger');

  throw(error: any, message?: string) {
    this.logger.error(error);

    if (error?.code === HttpStatus.NOT_FOUND)
      throw new NotFoundException(
        {
          ...error,
          timestamp: new Date().toISOString(),
          status: HttpStatus.NOT_FOUND,
          message,
        },
        message || 'Lo sentimos, no se encontraron los datos.',
      );

    if (error?.code === HttpStatus.BAD_REQUEST)
      throw new BadRequestException(
        {
          ...error,
          timestamp: new Date().toISOString(),
          status: HttpStatus.BAD_REQUEST,
          message,
        },
        message ||
          'Ocurrió un error inesperado, revise los datos y vuelva a intentarlo.',
      );
    if (error?.code === HttpStatus.INTERNAL_SERVER_ERROR)
      throw new InternalServerErrorException(
        {
          ...error,
          timestamp: new Date().toISOString(),
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message,
        },
        message || 'Ocurrió un error inesperado.',
      );

    throw new HttpException(
      {
        ...error,
        timestamp: new Date().toISOString(),
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message,
      },
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }

  success({
    status = HttpStatus.BAD_REQUEST,
    data = null,
    error = null,
    message = '',
  }): ResponseHttp {
    return {
      status,
      error,
      data,
      message,
    };
  }
}
