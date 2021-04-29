import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from './config/config.module';
import { DatabaseModule } from './database/database.module';
import { CqrsModule } from './cqrs/cqrs.module';
import { MoneyModule } from './modules/money/money.module';

@Module({
  imports: [
    ConfigModule,
    DatabaseModule,
    CqrsModule,
    MoneyModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {
}
