import { TransactionModel } from "./TransactionModel";

export interface CostCenterModel {
  id: number;
  name: string;
  percentage: number | null;
  userId: number
  createdAt: Date;
  updatedAt: Date;
  transactions: TransactionModel[]
}

export interface CreateCostCenterModel {
  name: string;
  percentage: number;
  userId: number
}
export interface UpdateCostCenterModel {
  name: string;
  percentage: number;
}
