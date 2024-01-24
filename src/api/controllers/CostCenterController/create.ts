import { Response } from "express"
import { ApiError } from "../../../configs/errors/ApiError";
import { MapErrors } from "../../../configs/errors/MapErrors";
import { CreateCostCenterModel } from "../../models/CostCenterModel";
import { ERROR_COST_CENTER_MESSAGE } from "../../../configs/constants";
import { UserAuthRequest } from "../../../configs/requests/UserAuthRequest";
import { CostCenterRepository } from "../../repositories/CostCenterRepository";

export const create = MapErrors(async (request: UserAuthRequest, response: Response) => {
  // #swagger.tags = ['Centro de Custo']
  // #swagger.summary = 'Criar centro de custo'

  const user = request.userAuth;

  const costCenterData: CreateCostCenterModel = request.body;

  const percentageTotal = await CostCenterRepository.getTotalPercentage(user.id);

  if ((percentageTotal + costCenterData.percentage) > 100) throw new ApiError(400, ERROR_COST_CENTER_MESSAGE)

  const data = await CostCenterRepository.insert({ ...costCenterData, userId: user.id });

  return response.json(data);
});
