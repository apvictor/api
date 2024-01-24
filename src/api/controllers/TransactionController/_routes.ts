import { edit } from "./edit";
import { Router } from "express";
import { create } from "./create";
import { destroy } from "./destroy";
import { getTransactions } from "./getTransactions";
import { getTransactionsTotal } from "./getTransactionsTotal";
import { UserAuth } from "../../../shared/middlewares/UserAuth";
import { Validate } from "../../../shared/middlewares/Validate";
import { TransactionValidation } from "../../validations/TransactionValidation";

export const transactionRoutes = Router();

transactionRoutes.get("/transactions", UserAuth, getTransactions);
transactionRoutes.get("/transactions/total", UserAuth, getTransactionsTotal);
transactionRoutes.post("/transactions", UserAuth, Validate(TransactionValidation.create), create);
transactionRoutes.put("/transactions/:id", UserAuth, Validate(TransactionValidation.edit), edit);
transactionRoutes.delete("/transactions/:id", UserAuth, Validate(TransactionValidation.delete), destroy);
