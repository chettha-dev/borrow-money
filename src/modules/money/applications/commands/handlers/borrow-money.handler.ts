import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BorrowMoneyCommand } from '../commands';
import { InjectRepository } from '@nestjs/typeorm';
import { BorrowRepository, UserRepository } from '../../../domains/repositories';
import { HttpStatus, Inject } from '@nestjs/common';
import { BorrowFactory } from '../../../domains/factories';
import { Exception } from '../../../../../common/exceptions';
import { BorrowModel } from '../../../domains/models/borrow.model';

@CommandHandler(BorrowMoneyCommand)
export class BorrowMoneyHandler implements ICommandHandler<BorrowMoneyCommand> {
  constructor(@InjectRepository(UserRepository)
              private readonly userRepo: UserRepository,
              @InjectRepository(BorrowRepository)
              private readonly borrowRepo: BorrowRepository,
              @Inject(BorrowFactory)
              private readonly borrowFactory: BorrowFactory) {
  }

  async execute({ userId, targetUserId, data}: BorrowMoneyCommand): Promise<BorrowModel> {
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

    const haveBorrow = await this.borrowRepo.findByUserAndTarget(userId, targetUserId);

    if(haveBorrow){
      throw new Exception({
        module: 'money',
        type: 'application',
        codes: ['Don\'t borrow more'],
        statusCode: HttpStatus.BAD_REQUEST,
      });
    }

    const entity = this.borrowFactory.create(data);

    entity.setTargetUser(targetUser);
    user.setBorrow(entity);

    await this.userRepo.save(user);

    return entity;
  }
}
