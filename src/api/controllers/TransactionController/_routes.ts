import { Router } from "express";
import { TransactionController } from ".";
import { UserAuth } from "../../../middlewares/UserAuth";
import { Validate } from "../../../middlewares/Validate";
import { TransactionValidation } from "../../validations/TransactionValidation";

export const transactionRoutes = Router();

transactionRoutes.get("/transactions", UserAuth, TransactionController.getTransactions);
transactionRoutes.get("/transactions/total", UserAuth, TransactionController.getTransactionsTotal);
transactionRoutes.post("/transactions", UserAuth, Validate(TransactionValidation.create), TransactionController.create);
