import { Response } from "express"
import { AccountModel } from "../../models/AccountModel";
import { MapErrors } from "../../../configs/errors/MapErrors";
import { AccountRepository } from "../../repositories/AccountRepository";
import { UserAuthRequest } from "../../../configs/requests/UserAuthRequest";
import { TransactionRepository } from "../../repositories/TransactionRepository";

export const getAccounts = MapErrors(async (request: UserAuthRequest, response: Response) => {
  /*
    #swagger.tags = ['Conta']
    #swagger.summary = 'Listar contas'

    #swagger.security = [{"apiKeyAuth": []}]

    #swagger.responses[200] = {
      schema: {
        "id": 1,
        "name": "Nubank",
        "value": 100,
        "createdAt": "2024-01-24T18:57:20.748Z",
        "updatedAt": "2024-01-24T18:57:20.748Z",
        "deletedAt": "",
        "userId": 1,
        "expenseTotal": 0,
        "incomeTotal": 0
      }
    }
  */

  const user = request.userAuth
  const month = request.query.month;

  const data: AccountModel[] = await AccountRepository.getAll(user.id);

  await Promise.all(data.map(async (item) => {
    item.incomeTotal = await TransactionRepository.getTotalByAccountId(item.id, "INCOME");
    item.expenseTotal = await TransactionRepository.getTotalByAccountId(item.id, "EXPENSE");
  }));

  return response.json(data);
});
