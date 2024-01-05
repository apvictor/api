import { Response } from "express"
import { ApiError } from "../../../configs/errors/ApiError";
import { MapErrors } from "../../../configs/errors/MapErrors";
import { ERROR_COST_CENTER_MESSAGE } from "../../../configs/constants";
import { UserAuthRequest } from "../../../configs/requests/UserAuthRequest";
import { CostCenterRepository } from "../../repositories/CostCenterRepository";
import { CostCenterModel, CreateCostCenterModel } from "../../models/CostCenterModel";

export const CostCenterController = {
  create: MapErrors(async (request: UserAuthRequest, response: Response) => {
    const user = request.userAuth;

    const costCenterData: CreateCostCenterModel = request.body;

    const percentageTotal = await CostCenterRepository.getTotalPercentage(user.id);

    if ((percentageTotal + costCenterData.percentage) > 100) throw new ApiError(400, ERROR_COST_CENTER_MESSAGE)

    const data = await CostCenterRepository.insert({ ...costCenterData, userId: user.id });

    return response.json(data);
  }),
  getCostCenters: MapErrors(async (request: UserAuthRequest, response: Response) => {
    const user = request.userAuth;
    const filters = request.query.transactionType;

    const data = await CostCenterRepository.getAll(user.id, filters);

    const dto = data.map((item) => calculateTotalValue(item));

    return response.json(dto);
  }),
}

function calculateTotalValue(item: CostCenterModel) {
  const value = item.transactions.reduce((sum, transaction) => sum + transaction.value, 0);
  return { ...item, value };
}
