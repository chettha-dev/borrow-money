import { Column, Entity } from 'typeorm'
import { BaseModel } from '../../../../common/models'
import { UserDto } from '../../applications/dtos';

@Entity({ name: 'user' })
export class UserModel extends BaseModel {
    @Column()
    name: string;

    @Column()
    phone: string;

    create(id: string, data: UserDto){
        this.id = id;
        this.name = data.name;
        this.phone = data.phone;
    }

    update(data: UserDto) {
        this.name = data.name;
        this.phone = data.phone;
    }
}