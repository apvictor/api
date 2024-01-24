import { Response } from "express"
import { MapErrors } from "../../../configs/errors/MapErrors";
import { TransactionModel } from "../../models/TransactionModel";
import { UserAuthRequest } from "../../../configs/requests/UserAuthRequest";
import { TransactionRepository } from "../../repositories/TransactionRepository";

type GroupedTransaction = {
  [key: string]: TransactionModel[];
};

export const getTransactions = MapErrors(async (request: UserAuthRequest, response: Response) => {
  // #swagger.tags = ['Transação']
  // #swagger.summary = 'Listar transações'

  const user = request.userAuth;
  const search = request.query.search;
  const transactionType = request.query.transactionType;

  const transactions = await TransactionRepository.getAll(user.id, search, transactionType);

  const groupedTransactions = transactions.reduce((result: any, transaction: TransactionModel) => {

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
