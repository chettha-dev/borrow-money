import { GetTransactionHandler, GetUserByIdHandler, GetUsersHandler } from './handlers';
import { GetBorrowByUserHandler } from './handlers/get-borrow-by-user.handler';

export const Queries = {
  handlers: [
    GetUsersHandler,
    GetUserByIdHandler,
    GetBorrowByUserHandler,
    GetTransactionHandler
  ]
}
