export interface AccountModel {
  id: number;
  name: string;
  value: number;
  type: "CASH" | "INVESTMENT";
  userId: number
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateAccountModel {
  name: string;
  value: number;
  type: "CASH" | "INVESTMENT";
  userId: number
}

export interface UpdateAccountModel {
  name: string;
  value: number;
  type: "CASH" | "INVESTMENT";
}
