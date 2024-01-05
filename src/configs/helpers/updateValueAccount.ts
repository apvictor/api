import { ApiError } from "../errors/ApiError";
import { AccountModel } from "../../api/models/AccountModel";
import { ERROR_TRANSACTION_BALANCE_MESSAGE } from "../constants";
import { CreateTransactionModel } from "../../api/models/TransactionModel";

export function updateValueAccount(account: AccountModel, transaction: CreateTransactionModel) {
  let newValue = 0;
  if (transaction.transactionType == "EXPENSE") {
    if (transaction.value >= account.value) throw new ApiError(404, ERROR_TRANSACTION_BALANCE_MESSAGE);
    newValue = account.value - transaction.value;
  } else {
    newValue = account.value + transaction.value;
  }

  return newValue
}
