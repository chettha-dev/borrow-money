import { DebtsMoneyHandler, RegisterUserHandler } from './handlers';
import { BorrowMoneyHandler } from './handlers/borrow-money.handler';

export const Commands = {
  handlers: [
    RegisterUserHandler,
    BorrowMoneyHandler,
    DebtsMoneyHandler
  ]
}
