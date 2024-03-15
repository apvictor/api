import { Response } from "express"
import { MapErrors } from "../../../configs/errors/MapErrors";
import { UserAuthRequest } from "../../../configs/requests/UserAuthRequest";
import { TransactionRepository } from "../../repositories/TransactionRepository";

export const getTransactionsTotal = MapErrors(async (request: UserAuthRequest, response: Response) => {
  /*
    #swagger.tags = ['Transação']
    #swagger.summary = 'Listar total da entrada e saída e contas a pagas e a pagar'

    #swagger.security = [{"apiKeyAuth": []}]

    #swagger.responses[200] = {
      schema: {
        expense: 0,
        income: 0
      }
    }
  */

  const user = request.userAuth;

  const month = request.query.month;

  const income = await TransactionRepository.getTotal(user.id, "INCOME", month);
  const expense = await TransactionRepository.getTotal(user.id, "EXPENSE", month);
  const debtor = await TransactionRepository.getTotalPaidAndNotPaid(user.id, false, month);
  const paid = await TransactionRepository.getTotalPaidAndNotPaid(user.id, true, month);

  return response.json({ expense, income, debtor, paid });
});
