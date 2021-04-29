import { Column, Entity, OneToMany } from 'typeorm'
import { BaseModel } from '../../../../common/models'
import { UserDto } from '../../applications/dtos';
import { BorrowModel } from './borrow.model';

@Entity({ name: 'user' })
export class UserModel extends BaseModel {
    @Column()
    name: string;

    @Column()
    phone: string;

    @OneToMany(
      () => BorrowModel,
      borrow => borrow.user,
      {eager: false, cascade: true},
    )
    borrows: BorrowModel[];

    create(id: string, data: UserDto){
        this.id = id;
        this.name = data.name;
        this.phone = data.phone;
    }

    setBorrow(borrow: BorrowModel){
        this.borrows.push(borrow);
    }
}