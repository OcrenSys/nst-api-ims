import {
  Logger,
  HttpStatus,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
  Injectable,
  HttpException,
} from '@nestjs/common';
import { ResponseHttp } from '../interfaces/response.http';

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
          statusCode: HttpStatus.NOT_FOUND,
          message: message,
        },
        message || 'Lo sentimos, no se encontraron los datos.',
      );

    if (error?.code === HttpStatus.BAD_REQUEST)
      throw new BadRequestException(
        {
          ...error,
          timestamp: new Date().toISOString(),
          statusCode: HttpStatus.BAD_REQUEST,
          message: message,
        },
        message ||
          'Ocurrió un error inesperado, revise los datos y vuelva a intentarlo.',
      );
    if (error?.code === HttpStatus.INTERNAL_SERVER_ERROR)
      throw new InternalServerErrorException(
        {
          ...error,
          timestamp: new Date().toISOString(),
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: message,
        },
        message || 'Ocurrió un error inesperado.',
      );

    throw new HttpException(
      {
        ...error,
        timestamp: new Date().toISOString(),
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: message,
      },
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }

  success({
    statusCode = HttpStatus.BAD_REQUEST,
    data = null,
    error = null,
    message = '',
  }): ResponseHttp {
    return {
      statusCode: statusCode,
      timestamp: new Date().toISOString(),
      error: error,
      data: data,
      message: message,
    };
  }
}
