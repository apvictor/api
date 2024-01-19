import { Router } from "express";
import { AccountController } from ".";
import { AccountValidation } from "../../validations/AccountValidation";
import { UserAuth } from "../../../shared/middlewares/UserAuth";
import { Validate } from "../../../shared/middlewares/Validate";

export const accountRoutes = Router();

accountRoutes.get("/accounts", UserAuth, AccountController.getAccounts);
accountRoutes.post("/accounts", UserAuth, Validate(AccountValidation.create), AccountController.create);
accountRoutes.put("/accounts/:id", UserAuth, Validate(AccountValidation.edit), AccountController.edit);
accountRoutes.delete("/accounts/:id", UserAuth, Validate(AccountValidation.delete), AccountController.delete);
