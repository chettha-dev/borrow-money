import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { BorrowModel } from "src/modules/money/domains/models";
import { BorrowRepository } from "src/modules/money/domains/repositories";
import { GetBorrowByUserCommand } from "../commands";

@QueryHandler(GetBorrowByUserCommand)
export class GetBorrowByUserHandler implements IQueryHandler<GetBorrowByUserCommand> {
  constructor(@InjectRepository(BorrowRepository)
              private readonly borrowRepository: BorrowRepository){
  }

  execute({ userId}: GetBorrowByUserCommand): Promise<BorrowModel[]> {
    return this.borrowRepository.findByUser(userId);
  }

}