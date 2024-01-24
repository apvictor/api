import { edit } from "./edit";
import { Router } from "express";
import { create } from "./create";
import { destroy } from "./destroy";
import { getAccounts } from "./getAccounts";
import { UserAuth } from "../../../shared/middlewares/UserAuth";
import { Validate } from "../../../shared/middlewares/Validate";
import { AccountValidation } from "../../validations/AccountValidation";

export const accountRoutes = Router();

accountRoutes.get("/accounts", UserAuth, getAccounts);
accountRoutes.put("/accounts/:id", UserAuth, Validate(AccountValidation.edit), edit);
accountRoutes.post("/accounts", UserAuth, Validate(AccountValidation.create), create);
accountRoutes.delete("/accounts/:id", UserAuth, Validate(AccountValidation.delete), destroy);
