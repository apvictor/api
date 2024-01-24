import { Response } from "express"
import { ApiError } from "../../../configs/errors/ApiError";
import { MapErrors } from "../../../configs/errors/MapErrors";
import { UpdateCostCenterModel } from "../../models/CostCenterModel";
import { ERROR_COST_CENTER_MESSAGE } from "../../../configs/constants";
import { UserAuthRequest } from "../../../configs/requests/UserAuthRequest";
import { CostCenterRepository } from "../../repositories/CostCenterRepository";

export const edit = MapErrors(async (request: UserAuthRequest, response: Response) => {
  /*
    #swagger.tags = ['Centro de Custo']
    #swagger.summary = 'Editar centro de custo'

    #swagger.security = [{"apiKeyAuth": []}]

    #swagger.parameters['id'] = {
      in: 'path',
      required: true,
      type: 'integer'
    }

    #swagger.parameters['body'] = {
      in: 'body',
      required: true,
      schema: {
        name: "Casa",
        percentage: 50
      }
    }
  */

  const id = request.params.id;
  const user = request.userAuth;

  const costCenterData: UpdateCostCenterModel = request.body;

  const costCenter = await CostCenterRepository.getById(parseInt(id));

  const percentageTotal = await CostCenterRepository.getTotalPercentage(user.id);

  if (((percentageTotal + costCenterData.percentage) - costCenter.percentage) > 100) throw new ApiError(400, ERROR_COST_CENTER_MESSAGE)

  const data = await CostCenterRepository.update(parseInt(id), { ...costCenterData });

  return response.json(data);
});
