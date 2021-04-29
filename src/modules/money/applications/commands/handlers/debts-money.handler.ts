import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DebtsMoneyCommand } from '../commands';
import { InjectRepository } from '@nestjs/typeorm';
import { BorrowRepository, UserRepository } from '../../../domains/repositories';
import { HttpStatus, Inject } from '@nestjs/common';
import { BorrowFactory, TransactionFactory } from '../../../domains/factories';
import { Exception } from '../../../../../common/exceptions';
import { BorrowModel } from '../../../domains/models/borrow.model';

@CommandHandler(DebtsMoneyCommand)
export class DebtsMoneyHandler implements ICommandHandler<DebtsMoneyCommand> {
  constructor(@InjectRepository(UserRepository)
              private readonly userRepo: UserRepository,
              @InjectRepository(BorrowRepository)
              private readonly borrowRepo: BorrowRepository,
              @Inject(BorrowFactory)
              private readonly borrowFactory: BorrowFactory,
              @Inject(TransactionFactory)
              private readonly transactionFactory: TransactionFactory) {
  }

  async execute({ userId, targetUserId, data}: DebtsMoneyCommand): Promise<BorrowModel> {
    const user = await this.userRepo.findById(userId);

    if(!user){
      throw new Exception({
        module: 'money',
        type: 'application',
        codes: ['user_not_exists'],
        statusCode: HttpStatus.BAD_REQUEST,
      });
    }

    const targetUser = await this.userRepo.findById(targetUserId);

    if(!targetUser){
      throw new Exception({
        module: 'money',
        type: 'application',
        codes: ['target_user_not_exists'],
        statusCode: HttpStatus.BAD_REQUEST,
      });
    }

    const borrow = await this.borrowRepo.findByUserAndTarget(userId, targetUserId);

    if(!borrow){
      throw new Exception({
        module: 'money',
        type: 'application',
        codes: ['borrow_not_found'],
        statusCode: HttpStatus.BAD_REQUEST,
      });
    }

    const entity = await this.transactionFactory.create(data.amount);
    borrow.setTransaction(entity);
    borrow.decreaseDebts(data.amount);

    await this.borrowRepo.save(borrow);

    return borrow;
  }
}
