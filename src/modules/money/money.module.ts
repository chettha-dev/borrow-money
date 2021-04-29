import { Module } from '@nestjs/common';
import { MoneyController } from './applications/controllers';
import { Commands } from './applications/commands';
import { Queries } from './applications/queries';
import { Factories } from './domains/factories';
import { Events } from './applications/events';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Repositories } from './domains/repositories';

@Module({
  imports: [TypeOrmModule.forFeature(Repositories)],
  controllers: [MoneyController],
  providers: [
    ...Commands.handlers,
    ...Queries.handlers,
    ...Factories,
    ...Events
  ]
})
export class MoneyModule {}
