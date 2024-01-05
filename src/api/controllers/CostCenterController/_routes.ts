import { Router } from "express";
import { CostCenterController } from ".";
import { Validate } from "../../../middlewares/Validate";
import { UserAuth } from "../../../middlewares/UserAuth";
import { CostCenterValidation } from "../../validations/CostCenterValidation";

export const costCenterRoutes = Router();

costCenterRoutes.get("/cost-centers", UserAuth, CostCenterController.getCostCenters);
costCenterRoutes.post("/cost-centers", UserAuth, Validate(CostCenterValidation.create), CostCenterController.create);
