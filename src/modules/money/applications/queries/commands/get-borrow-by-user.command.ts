import { IQuery } from "@nestjs/cqrs";

export class GetBorrowByUserCommand implements IQuery {
  constructor(public readonly userId:string) {}
}