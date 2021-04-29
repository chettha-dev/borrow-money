import { v4 as uuidv4 } from 'uuid';
import { TransactionModel } from "../models/transaction.model";

export class TransactionFactory {
  public create(amount: number){
    const uuid = uuidv4();
    const transaction = new TransactionModel();
    transaction.create(uuid, amount);

    return transaction;
  }
}