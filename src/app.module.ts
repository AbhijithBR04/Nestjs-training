import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { BooksModule } from './books/books.module';
import { LoggerMiddleware } from './logger.middleware';

@Module({
  imports: [AuthModule, BooksModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)  // NestJS automatically instantiates the class
      .forRoutes({ path: '*', method: RequestMethod.ALL });  // Apply to all routes
  }
}