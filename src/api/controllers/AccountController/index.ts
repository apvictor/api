import { Response } from "express"
import { MapErrors } from "../../../configs/errors/MapErrors";
import { AccountModel, CreateAccountModel } from "../../models/AccountModel";
import { AccountRepository } from "../../repositories/AccountRepository";
import { UserAuthRequest } from "../../../configs/requests/UserAuthRequest";
import { TransactionRepository } from "../../repositories/TransactionRepository";

export const AccountController = {
  create: MapErrors(async (request: UserAuthRequest, response: Response) => {
    const user = request.userAuth
    const accountData: CreateAccountModel = request.body;

    const data = await AccountRepository.insert({ ...accountData, userId: user.id });

    return response.json(data);
  }),
  getTotal: MapErrors(async (request: UserAuthRequest, response: Response) => {
    const user = request.userAuth

    const total = await AccountRepository.getTotalMonth(user.id);

    return response.json({ total });
  }),
  getAccounts: MapErrors(async (request: UserAuthRequest, response: Response) => {
    const user = request.userAuth

    const data: AccountModel[] = await AccountRepository.getAll(user.id);

    await Promise.all(data.map(async (item) => {
      item.expenseTotal = await TransactionRepository.getTotalByAccountId(item.id, "EXPENSE");
      item.incomeTotal = await TransactionRepository.getTotalByAccountId(item.id, "INCOME");
    }));

    console.log(data);

    return response.json(data);
  }),
}
