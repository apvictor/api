export interface AccountModel {
  id: number;
  name: string;
  expenseTotal?: number;
  incomeTotal?: number;
  userId: number
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateAccountModel {
  name: string;
  userId: number
}

export interface UpdateAccountModel {
  name: string;
}
