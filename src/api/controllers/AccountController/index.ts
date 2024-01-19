import { Response } from "express"
import { MapErrors } from "../../../configs/errors/MapErrors";
import { AccountRepository } from "../../repositories/AccountRepository";
import { UserAuthRequest } from "../../../configs/requests/UserAuthRequest";
import { TransactionRepository } from "../../repositories/TransactionRepository";
import { AccountModel, CreateAccountModel, UpdateAccountModel } from "../../models/AccountModel";

export const AccountController = {
  delete: MapErrors(async (request: UserAuthRequest, response: Response) => {
    const id = request.params.id;

    const data = await AccountRepository.delete(parseInt(id));

    return response.json(data);
  }),
  edit: MapErrors(async (request: UserAuthRequest, response: Response) => {
    const id = request.params.id

    const accountData: UpdateAccountModel = request.body;

    const data = await AccountRepository.update(parseInt(id), { ...accountData });

    return response.json(data);
  }),
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

    return response.json(data);
  }),
}
