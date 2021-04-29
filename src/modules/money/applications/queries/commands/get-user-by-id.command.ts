import { IQuery } from "@nestjs/cqrs";

export class GetUserByIdCommand implements IQuery {
  constructor(public readonly userId:string) {}
}