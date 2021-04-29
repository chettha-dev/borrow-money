import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { UserModel } from '../../domains/models/user.model';
import { GetUsersCommand } from '../queries/commands';


@ApiTags('borrow/money')
@Controller('money')
export class MoneyController {
  constructor(private readonly commandBus: CommandBus,
              private readonly queryBus: QueryBus) {
  }

  @Get('users') 
  async getUsers(): Promise<UserModel[]> {
    return await this.queryBus.execute(new GetUsersCommand());
  }
}
