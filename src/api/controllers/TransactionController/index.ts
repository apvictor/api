import { Response } from "express"
import { MapErrors } from "../../../configs/errors/MapErrors";
import { CreateTransactionModel, TransactionModel } from "../../models/TransactionModel";
import { AccountRepository } from "../../repositories/AccountRepository";
import { UserAuthRequest } from "../../../configs/requests/UserAuthRequest";
import { CostCenterRepository } from "../../repositories/CostCenterRepository";
import { TransactionRepository } from "../../repositories/TransactionRepository";
import { updateValueAccount } from "../../../configs/helpers/updateValueAccount";

type GroupedTransaction = {
  [key: string]: TransactionModel[];
};

export const TransactionController = {
  create: MapErrors(async (request: UserAuthRequest, response: Response) => {
    const transactionData: CreateTransactionModel = request.body

    const costCenter = transactionData.costCenterId ? (await CostCenterRepository.getById(transactionData.costCenterId)).id : null;
    const account = await AccountRepository.getById(transactionData.accountId);

    const newValue = updateValueAccount(account, transactionData);

    await AccountRepository.update(account.id, { ...account, value: newValue });

    const data = await TransactionRepository.insert({
      ...transactionData,
      costCenterId: costCenter,
      accountId: account.id
    });

    return response.json(data);
  }),
  getTransactions: MapErrors(async (request: UserAuthRequest, response: Response) => {
    const user = request.userAuth;
    const search = request.query.search;

    const transactions = await TransactionRepository.getAll(user.id, search);

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
  }),
  getTransactionsTotal: MapErrors(async (request: UserAuthRequest, response: Response) => {
    const user = request.userAuth;

    const totalExpense = await TransactionRepository.getTotal(user.id, "EXPENSE");
    const totalIncome = await TransactionRepository.getTotal(user.id, "INCOME");

    return response.json({ expense: totalExpense, income: totalIncome });
  }),
}
