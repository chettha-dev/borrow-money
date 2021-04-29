import { EntityRepository, Repository } from "typeorm";
import { TransactionModel } from "../models/transaction.model";

@EntityRepository(TransactionModel)
export class TransactionRepository extends Repository<TransactionModel> {
  async findById(id: string): Promise<TransactionModel> {
    return await this.findOne(id);
  }
}