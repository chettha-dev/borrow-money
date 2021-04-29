import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { UserModel } from "src/modules/money/domains/models/user.model";
import { UserRepository } from "src/modules/money/domains/repositories/user.repository";
import { GetUserByIdCommand } from "../commands";

@QueryHandler(GetUserByIdCommand)
export class GetUserByIdHandler implements IQueryHandler<GetUserByIdCommand> {
  constructor(@InjectRepository(UserRepository)
              private readonly userRepo: UserRepository){
  }

  execute({ userId}: GetUserByIdCommand): Promise<UserModel> {
    return this.userRepo.findById(userId);
  }

}