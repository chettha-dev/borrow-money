import { ExceptionFilter, Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from './config/config.module';
import { DatabaseModule } from './database/database.module';
import { CqrsModule } from './cqrs/cqrs.module';
import { MoneyModule } from './modules/money/money.module';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule,
    DatabaseModule,
    CqrsModule,
    MoneyModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    }
  ],
})
export class AppModule {
}
