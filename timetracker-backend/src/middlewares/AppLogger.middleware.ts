import { Injectable, Logger, NestMiddleware } from '@nestjs/common';

import { NextFunction, Request, Response } from 'express';

@Injectable()
export class AppLoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(request: Request, response: Response, next: NextFunction): void {
    const { ip, method, originalUrl, cookies: request_cookies } = request;
    const userAgent = request.get('user-agent') || '';
    response.on('close', () => {
      const { statusCode, cookie: response_cookies } = response;
      const contentLength = response.get('content-length');

      this.logger.log(
        `${method} ${originalUrl} ${statusCode} ${contentLength} - ${userAgent} ${ip}`,
      );
      this.logger.log(`request cookies ${JSON.stringify(request_cookies)}`);
      this.logger.log(`response cookies ${JSON.stringify(response_cookies)}`);
    });

    next();
  }
}
