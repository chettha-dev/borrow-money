import { IQuery } from "@nestjs/cqrs";

export class GetUsersCommand implements IQuery {
    constructor() {}
}