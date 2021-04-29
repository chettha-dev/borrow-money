import { EntityRepository, Repository } from "typeorm";
import { UserModel } from "../models/user.model";

@EntityRepository(UserModel)
export class UserRepository extends Repository<UserModel> {
    async findById(id: string): Promise<UserModel> {
        return await this.findOne(id);
    }
}