import { Router } from "express";
import { CostCenterController } from ".";
import { CostCenterValidation } from "../../validations/CostCenterValidation";
import { UserAuth } from "../../../shared/middlewares/UserAuth";
import { Validate } from "../../../shared/middlewares/Validate";

export const costCenterRoutes = Router();

costCenterRoutes.get("/cost-centers", UserAuth, CostCenterController.getCostCenters);
costCenterRoutes.post("/cost-centers", UserAuth, Validate(CostCenterValidation.create), CostCenterController.create);
