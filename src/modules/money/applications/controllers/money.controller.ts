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


@ApiTags('borrow/money')
@Controller('money')
export class MoneyController {
  constructor(private readonly commandBus: CommandBus,
              private readonly queryBus: QueryBus) {
  }

  @Get('items')
  @ApiQuery({name: 'query', required: false})
  async getItems(@Query('query') query: string): Promise<any> {
    return 1
  }
}
