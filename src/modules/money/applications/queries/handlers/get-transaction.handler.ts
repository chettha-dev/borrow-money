import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetTransactionCommand } from "../commands";
import { InjectRepository } from '@nestjs/typeorm';
import { TransactionRepository, BorrowRepository } from '../../../domains/repositories';

@QueryHandler(GetTransactionCommand)
export class GetTransactionHandler implements IQueryHandler<GetTransactionCommand> {
  constructor(@InjectRepository(TransactionRepository)
              private readonly transactionRepository: TransactionRepository,
              @InjectRepository(BorrowRepository)
              private readonly borrowRepository: BorrowRepository){
  }

  async execute({ userId, targetUserId }: GetTransactionCommand): Promise<any> {
    const tableName = 'transaction';
    let queryBuilder: any = this.transactionRepository.createQueryBuilder(tableName)

    queryBuilder.leftJoinAndSelect('transaction.borrow', 'borrow');
    queryBuilder.leftJoinAndSelect('borrow.user', 'user');
    queryBuilder.leftJoinAndSelect('borrow.targetUser', 'target');

    if(!targetUserId){
      queryBuilder.where("user.id = :userId", {userId: userId})
      queryBuilder.orWhere("target.id = :userId", {userId: userId})
    }else{
      queryBuilder.where('user.id = :userId AND target.id = :targetUserId', {userId: userId, targetUserId:targetUserId})
      queryBuilder.orWhere('user.id = :targetUserId AND target.id = :userId', {userId: userId, targetUserId:targetUserId})
    }

    queryBuilder.select(['transaction.*','user.name', 'user.id', 'target.name','target.id'])

    return await queryBuilder.getRawMany();

  }
}