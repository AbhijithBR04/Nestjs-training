import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
 
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('DebugMiddleware');
 
  use(req: Request, res: Response, next: NextFunction): void {
    this.logger.log(`Headers: ${JSON.stringify(req.headers)}`);
    next();
  }
}
 