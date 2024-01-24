import { Response } from "express"
import { MapErrors } from "../../../configs/errors/MapErrors";
import { CostCenterModel } from "../../models/CostCenterModel";
import { UserAuthRequest } from "../../../configs/requests/UserAuthRequest";
import { CostCenterRepository } from "../../repositories/CostCenterRepository";

function calculateTotalValue(item: CostCenterModel) {
  const value = item.transactions.reduce((sum, transaction) => sum + transaction.value, 0);
  return { ...item, value };
}

export const getCostCenters = MapErrors(async (request: UserAuthRequest, response: Response) => {
  // #swagger.tags = ['Centro de Custo']
  // #swagger.summary = 'Listar centros de custo'

  const user = request.userAuth;
  const filters = request.query.transactionType;

  const data = await CostCenterRepository.getAll(user.id, filters);

  const dto = data.map((item) => calculateTotalValue(item));

  return response.json(dto);
});
