import { Router } from "express";
import { AccountController } from ".";
import { Validate } from "../../../middlewares/Validate";
import { UserAuth } from "../../../middlewares/UserAuth";
import { AccountValidation } from "../../validations/AccountValidation";

export const accountRoutes = Router();

accountRoutes.get("/accounts", UserAuth, AccountController.getAccounts);
accountRoutes.get("/accounts/total", UserAuth, AccountController.getTotal);
accountRoutes.post("/accounts", UserAuth, Validate(AccountValidation.create), AccountController.create);
