import { Response } from "express"
import { MapErrors } from "../../../configs/errors/MapErrors";
import { CreateTransactionModel } from "../../models/TransactionModel";
import { AccountRepository } from "../../repositories/AccountRepository";
import { UserAuthRequest } from "../../../configs/requests/UserAuthRequest";
import { TransactionRepository } from "../../repositories/TransactionRepository";

export const create = MapErrors(async (request: UserAuthRequest, response: Response) => {
  /*
    #swagger.tags = ['Transação']
    #swagger.summary = 'Criar transação'

    #swagger.security = [{"apiKeyAuth": []}]

    #swagger.parameters['body'] = {
      in: 'body',
      required: true,
      schema: {
        name: "Aluguel",
        value: 500,
        accountId: 1,
        type: "EXPENSE"
      }
    }
  */

  const transactionData: CreateTransactionModel = request.body

  const accountId = (await AccountRepository.getById(transactionData.accountId)).id;

  const data = await TransactionRepository.insert({
    ...transactionData,
    accountId
  });

  return response.json(data);
});
