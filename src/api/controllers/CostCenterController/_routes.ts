import { Router } from "express";
import { CostCenterController } from ".";
import { UserAuth } from "../../../shared/middlewares/UserAuth";
import { Validate } from "../../../shared/middlewares/Validate";
import { CostCenterValidation } from "../../validations/CostCenterValidation";

export const costCenterRoutes = Router();

costCenterRoutes.get("/cost-centers", UserAuth, CostCenterController.getCostCenters);
costCenterRoutes.post("/cost-centers", UserAuth, Validate(CostCenterValidation.create), CostCenterController.create);
costCenterRoutes.put("/cost-centers/:id", UserAuth, Validate(CostCenterValidation.edit), CostCenterController.edit);
costCenterRoutes.delete("/cost-centers/:id", UserAuth, Validate(CostCenterValidation.delete), CostCenterController.delete);
