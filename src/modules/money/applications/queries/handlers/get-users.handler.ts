import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { UserModel } from "src/modules/money/domains/models/user.model";
import { UserRepository } from "src/modules/money/domains/repositories/user.repository";
import { GetUsersCommand } from "../commands";

@QueryHandler(GetUsersCommand)
export class GetUsersHandler implements IQueryHandler<GetUsersCommand> {
    constructor(@InjectRepository(UserRepository)
                private readonly userRepo: UserRepository){

                }

    execute(query: GetUsersCommand): Promise<UserModel[]> {
        return this.userRepo.find();
    }
    
}