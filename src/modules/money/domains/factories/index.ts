import { UserFactory } from "./user.factory";
import { BorrowFactory } from './borrow.factory';
import { TransactionFactory } from './transaction.factory';

export * from './user.factory';
export * from './borrow.factory';
export * from './transaction.factory';

export const Factories = [
    UserFactory,
    BorrowFactory,
    TransactionFactory
];

