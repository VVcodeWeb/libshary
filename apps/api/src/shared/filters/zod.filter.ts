import { ArgumentsHost, Catch, ExceptionFilter, Logger } from '@nestjs/common';
import { ZodError } from 'zod';

@Catch(ZodError)
export class ZodFilter<T extends ZodError> implements ExceptionFilter {
  private logger = new Logger(ZodFilter.name);
  catch(exception: T, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status = 400;
    this.logger.warn(exception);
    response.status(status).json({
      errors: exception.errors,
      message: exception.message,
      statusCode: status,
    });
  }
}
