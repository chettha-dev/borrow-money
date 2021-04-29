import { IQuery } from "@nestjs/cqrs";

export class GetTransactionCommand implements IQuery {
  constructor(public readonly userId:string,
              public readonly targetUserId?:string) {}
}