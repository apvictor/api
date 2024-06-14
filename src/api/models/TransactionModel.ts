export interface TransactionModel {
  id: number;
  name: string;
  value: number;
  accountId: number;
  type: "INCOME" | "EXPENSE";
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateTransactionModel {
  name: string;
  value: number;
  accountId: number;
  type: "INCOME" | "EXPENSE";
  paid: boolean;
}

export interface UpdateTransactionModel {
  name: string;
  value: number;
  accountId: number;
  type: "INCOME" | "EXPENSE";
}
