import { TransactionModel } from "./TransactionModel";

export interface AccountModel {
  id: number;
  name: string;
  value: number;
  expenseTotal?: number;
  incomeTotal?: number;
  userId: number
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateAccountModel {
  name: string;
  value: number;
  userId: number
}

export interface UpdateAccountModel {
  name: string;
  value: number;
}
