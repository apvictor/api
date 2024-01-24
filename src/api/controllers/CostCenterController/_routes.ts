import { edit } from "./edit";
import { Router } from "express";
import { create } from "./create";
import { destroy } from "./destroy";
import { getCostCenters } from "./getCostCenters";
import { UserAuth } from "../../../shared/middlewares/UserAuth";
import { Validate } from "../../../shared/middlewares/Validate";
import { CostCenterValidation } from "../../validations/CostCenterValidation";

export const costCenterRoutes = Router();

costCenterRoutes.get("/cost-centers", UserAuth, getCostCenters);
costCenterRoutes.put("/cost-centers/:id", UserAuth, Validate(CostCenterValidation.edit), edit);
costCenterRoutes.post("/cost-centers", UserAuth, Validate(CostCenterValidation.create), create);
costCenterRoutes.delete("/cost-centers/:id", UserAuth, Validate(CostCenterValidation.delete), destroy);
