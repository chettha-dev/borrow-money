import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from 'typeorm'
import { BaseModel } from '../../../../common/models'
import { MoneyActionEnum } from '../../../../common/enums';
import { UserModel } from './user.model';
import { TransactionModel } from './transaction.model';
import { BorrowDto } from '../../applications/dtos';

@Entity({ name: 'user_borrow' })
export class BorrowModel extends BaseModel {
  @Column({
    type: 'numeric',
    default: 0
  })
  amount: number;

  @Column({
    type: 'numeric',
    default: 0
  })
  debts: number;

  @Column({
    type: 'varchar',
  })
  action: MoneyActionEnum;

  @Column({
    type: 'bool',
  })
  terminate: boolean;

  @ManyToOne(
    () => UserModel,
    user => user.borrows,
  )
  @JoinColumn({ name: 'target_user_id' })
  targetUser: UserModel;

  @ManyToOne(
    () => UserModel,
    user => user.borrows,
  )
  @JoinColumn({ name: 'user_id' })
  user: UserModel;

  @OneToMany(
    () => TransactionModel,
    t => t.borrow,
    {eager: false, cascade: true},
  )
  transaction: TransactionModel[];

  create(id: string, data: BorrowDto){
    this.id = id;
    this.amount = data.amount;
    this.action = MoneyActionEnum.BORROW;
    this.terminate = false;
  }

  setTargetUser(entity: UserModel){
    this.targetUser = entity;
  }

  decreaseDebts(amount:number){
    this.debts = Number(amount) + Number(this.debts)

    if(this.amount <= this.debts){
      this.terminate = true;
    }
  }

  setTransaction(tm: TransactionModel){
    this.transaction.push(tm);
  }
}