import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

import { Messages } from './enum/messages.enum';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const exceptionResponse: any = exception.getResponse();
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();

    response.status(exceptionResponse.statusCode);
    response.json({
      message: exceptionResponse.message.toString() || Messages.UNDEFINED_ERROR,
    });

    console.error({
      status: exceptionResponse.statusCode || 500,
      message: exceptionResponse.message.toString() || Messages.UNDEFINED_ERROR,
    });
  }
}
