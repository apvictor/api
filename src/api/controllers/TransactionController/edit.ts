import { Response } from "express"
import { MapErrors } from "../../../configs/errors/MapErrors";
import { CreateTransactionModel } from "../../models/TransactionModel";
import { AccountRepository } from "../../repositories/AccountRepository";
import { UserAuthRequest } from "../../../configs/requests/UserAuthRequest";
import { TransactionRepository } from "../../repositories/TransactionRepository";

export const edit = MapErrors(async (request: UserAuthRequest, response: Response) => {
  /*
    #swagger.tags = ['Transação']
    #swagger.summary = 'Editar transação'

    #swagger.security = [{"apiKeyAuth": []}]

    #swagger.parameters['id'] = {
      in: 'path',
      required: true,
      type: 'integer'
    }

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
  const id = request.params.id

  const account = await AccountRepository.getById(transactionData.accountId);

  const data = await TransactionRepository.update(parseInt(id), {
    ...transactionData,
    accountId: account.id
  });

  return response.json(data);
});
