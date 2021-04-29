import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { UserModel } from '../../domains/models/user.model';
import {
  GetBorrowByUserCommand,
  GetTransactionCommand,
  GetUserByIdCommand,
  GetUsersCommand
} from '../queries/commands';
import { BorrowDto, UserDto } from '../dtos';
import { BorrowMoneyCommand, DebtsMoneyCommand, RegisterUserCommand } from '../commands/commands';
import { BorrowModel } from '../../domains/models/borrow.model';

@ApiTags('money')
@UseInterceptors(ClassSerializerInterceptor)
@Controller('money')
export class MoneyController {
  constructor(private readonly commandBus: CommandBus,
              private readonly queryBus: QueryBus) {
  }

  @Get('user')
  async getUsers(): Promise<UserModel[]> {
    return await this.queryBus.execute(new GetUsersCommand());
  }

  @Get('user/:user_id')
  async getUser(@Param('user_id') userId: string): Promise<UserModel> {
    return await this.queryBus.execute(new GetUserByIdCommand(userId));
  }

  @Get('user/:user_id/debts')
  async getUserDebts(@Param('user_id') userId: string): Promise<UserModel> {
    return await this.queryBus.execute(new GetBorrowByUserCommand(userId));
  }

  @Get('user/:user_id/transaction')
  async getUserTransaction(@Param('user_id') userId: string): Promise<UserModel> {
    return await this.queryBus.execute(new GetTransactionCommand(userId));
  }
  @Get('user/:user_id/transaction/:target_user_id')
  async getUsersTransaction(@Param('user_id') userId: string,
                           @Param('target_user_id') targetUserId: string): Promise<UserModel> {
    return await this.queryBus.execute(new GetTransactionCommand(userId, targetUserId));
  }

  @Post('user')
  async registerUsers(@Body() userDto: UserDto): Promise<UserModel> {
      return await this.commandBus.execute(new RegisterUserCommand(userDto));
  }

  @Post('user/:user_id/borrow/:target_user_id')
  async borrowMoney(
      @Param('user_id') userId: string,
      @Param('target_user_id') targetUserId: string,
      @Body() borrowDto: BorrowDto): Promise<BorrowModel> {
    return await this.commandBus.execute(new BorrowMoneyCommand(userId, targetUserId, borrowDto));
  }

  @Post('user/:user_id/debts/:target_user_id')
  async debtsMoney(
    @Param('user_id') userId: string,
    @Param('target_user_id') targetUserId: string,
    @Body() borrowDto: BorrowDto): Promise<BorrowModel> {
    return await this.commandBus.execute(new DebtsMoneyCommand(userId, targetUserId, borrowDto));
  }
}
