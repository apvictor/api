import { Response } from "express"
import { MapErrors } from "../../../configs/errors/MapErrors";
import { TransactionModel } from "../../models/TransactionModel";
import { UserAuthRequest } from "../../../configs/requests/UserAuthRequest";
import { TransactionRepository } from "../../repositories/TransactionRepository";

type GroupedTransaction = {
  [key: string]: TransactionModel[];
};

export const getTransactions = MapErrors(async (request: UserAuthRequest, response: Response) => {
  /*
    #swagger.tags = ['Transação']
    #swagger.summary = 'Listar transação'

    #swagger.security = [{"apiKeyAuth": []}]

    #swagger.responses[200] = {
      schema: [
        {
          "date": "26/01/2024",
          "transactions": [
            {
              "id": 7,
              "name": "Aluguel",
              "value": 500,
              "type": "EXPENSE",
              "createdAt": "2024-01-26T12:09:30.684Z",
              "updatedAt": "2024-01-26T12:09:30.684Z",
              "deletedAt": null,
              "accountId": 8,
              "account": {
                "id": 8,
                "name": "Nubank",
                "value": 1000,
                "createdAt": "2024-01-26T11:55:19.729Z",
                "updatedAt": "2024-01-26T12:09:03.773Z",
                "deletedAt": null,
                "userId": 2
              },
            }
          ]
        }
      ]
    }
  */

  const user = request.userAuth;
  const month = request.query.month;
  const search = request.query.search;
  const type = request.query.type;

  const transactions = await TransactionRepository.getAll(user.id, month, search, type);

  const groupedTransactions = transactions?.reduce((result: any, transaction: TransactionModel) => {

    const dateKey = transaction.createdAt.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });

    if (!result[dateKey]) result[dateKey] = [];

    result[dateKey].push(transaction);
    return result;
  }, {} as GroupedTransaction);

  const groupedTransactionsArray = Object.keys(groupedTransactions).map((date) => ({
    date,
    transactions: groupedTransactions[date],
  }));

  return response.json(groupedTransactionsArray);
})
