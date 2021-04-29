import { UserRepository } from "./user.repository";
import { BorrowRepository } from './borrow.repository';
import { TransactionRepository } from './transaction.repository';

export * from './user.repository';
export * from './borrow.repository';
export * from './transaction.repository';

export const Repositories = [
    UserRepository,
    BorrowRepository,
    TransactionRepository
];
