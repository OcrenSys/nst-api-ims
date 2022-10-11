import {
  Logger,
  HttpStatus,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
  Injectable,
} from '@nestjs/common';

@Injectable()
export class HandleExceptions {
  private readonly logger = new Logger('ProductsService');

  throw(error, message?: string) {
    this.logger.error(error, message);

    const data = {
      error: error,
      message: message || 'Ocurrió un error inesperado.',
      timestamp: new Date().toISOString(),
    };

    if (error?.code === HttpStatus.NOT_FOUND)
      throw new NotFoundException({
        ...data,
        statusCode: HttpStatus.NOT_FOUND,
      });

    if (error?.code === HttpStatus.BAD_REQUEST)
      throw new BadRequestException({
        ...data,
        statusCode: HttpStatus.BAD_REQUEST,
      });

    throw new InternalServerErrorException({
      ...data,
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
    });
  }

  success({ statusCode = HttpStatus.BAD_REQUEST, data = {}, message = '' }) {
    return {
      statusCode: statusCode,
      data: data,
      message: message,
      timestamp: new Date().toISOString(),
    };
  }
}
