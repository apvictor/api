import { Response } from "express"
import { AccountModel } from "../../models/AccountModel";
import { MapErrors } from "../../../configs/errors/MapErrors";
import { AccountRepository } from "../../repositories/AccountRepository";
import { UserAuthRequest } from "../../../configs/requests/UserAuthRequest";
import { TransactionRepository } from "../../repositories/TransactionRepository";

export const getAccounts = MapErrors(async (request: UserAuthRequest, response: Response) => {
  // #swagger.tags = ['Conta']
  // #swagger.summary = 'Listar contas'

  const user = request.userAuth

  const data: AccountModel[] = await AccountRepository.getAll(user.id);

  await Promise.all(data.map(async (item) => {
    item.expenseTotal = await TransactionRepository.getTotalByAccountId(item.id, "EXPENSE");
    item.incomeTotal = await TransactionRepository.getTotalByAccountId(item.id, "INCOME");
  }));

  return response.json(data);
});
