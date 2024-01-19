export interface TransactionModel {
  id: number;
  name: string;
  value: number;
  accountId: number;
  costCenterId: number | null;
  transactionType: "INCOME" | "EXPENSE";
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateTransactionModel {
  name: string;
  value: number;
  accountId: number;
  costCenterId: number | null;
  transactionType: "INCOME" | "EXPENSE";
}

export interface UpdateTransactionModel {
  name: string;
  value: number;
  accountId: number;
  costCenterId: number | null;
  transactionType: "INCOME" | "EXPENSE";
}
