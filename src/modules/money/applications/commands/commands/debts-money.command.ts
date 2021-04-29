import { ICommand } from '@nestjs/cqrs';
import { BorrowDto } from '../../dtos';

export class DebtsMoneyCommand implements ICommand {
  constructor(public readonly userId: string,
              public readonly targetUserId: string,
              public readonly data: BorrowDto) {
  }
}