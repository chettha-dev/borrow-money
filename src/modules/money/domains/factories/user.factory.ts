import { UserDto } from "../../applications/dtos";
import { v4 as uuidv4 } from 'uuid';
import { UserModel } from "../models/user.model";

export class UserFactory {
    public create(userDto: UserDto){
        const uuid = uuidv4();
        const user = new UserModel();
      
        user.create(uuid, userDto);

        return user;
    }
}