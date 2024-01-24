import { Response } from "express"
import { MapErrors } from "../../../configs/errors/MapErrors";
import { UserAuthRequest } from "../../../configs/requests/UserAuthRequest";
import { CostCenterRepository } from "../../repositories/CostCenterRepository";

export const destroy = MapErrors(async (request: UserAuthRequest, response: Response) => {
  // #swagger.tags = ['Centro de Custo']
  // #swagger.summary = 'Deletar centro de custo'

  const id = request.params.id;

  const data = await CostCenterRepository.delete(parseInt(id));

  return response.json(data);
});
