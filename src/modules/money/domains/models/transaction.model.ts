import { Column, Entity, ManyToOne } from 'typeorm'
import { BaseModel } from '../../../../common/models'
import { BorrowModel } from './borrow.model';

@Entity({ name: 'user_borrow_transaction' })
export class TransactionModel extends BaseModel {
  @Column({
    type: 'numeric',
    default: 0
  })
  amount: number;

  @ManyToOne(
    () => BorrowModel,
    b => b.transaction,
  )
  borrow: BorrowModel;

  create(id: string, amount: number){
    this.id = id;
    this.amount = amount;
  }
}