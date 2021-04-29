import { EntityRepository, Repository } from "typeorm";
import { BorrowModel } from "../models/borrow.model";

@EntityRepository(BorrowModel)
export class BorrowRepository extends Repository<BorrowModel> {
  async findById(id: string): Promise<BorrowModel> {
    return await this.findOne(id);
  }

  async findByUserAndTarget(userId:string, targetUserId: string) : Promise<BorrowModel> {
    return await this.findOne({  where : { user: userId,  targetUser: targetUserId, terminate: false} , relations: ['transaction'] });
  }

  async findByUser(userId:string): Promise<BorrowModel[]> {
    return await this.find( { where: { user:userId , terminate: false} , relations: ['targetUser', 'transaction']})
  }


}