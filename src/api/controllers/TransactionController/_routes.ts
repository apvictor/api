import { Router } from "express";
import { TransactionController } from ".";
import { TransactionValidation } from "../../validations/TransactionValidation";
import { UserAuth } from "../../../shared/middlewares/UserAuth";
import { Validate } from "../../../shared/middlewares/Validate";

export const transactionRoutes = Router();

transactionRoutes.get("/transactions", UserAuth, TransactionController.getTransactions);
transactionRoutes.get("/transactions/total", UserAuth, TransactionController.getTransactionsTotal);
transactionRoutes.post("/transactions", UserAuth, Validate(TransactionValidation.create), TransactionController.create);
transactionRoutes.put("/transactions/:id", UserAuth, Validate(TransactionValidation.edit), TransactionController.edit);
transactionRoutes.delete("/transactions/:id", UserAuth, Validate(TransactionValidation.delete), TransactionController.delete);
