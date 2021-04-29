import { BorrowDto } from "../../applications/dtos";
import { v4 as uuidv4 } from 'uuid';
import { BorrowModel } from "../models/borrow.model";

export class BorrowFactory {
  public create(userDto: BorrowDto){
    const uuid = uuidv4();
    const borrow = new BorrowModel();

    borrow.create(uuid, userDto);

    return borrow;
  }
}