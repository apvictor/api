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
  /*
    #swagger.tags = ['Centro de Custo']
    #swagger.summary = 'Listar centros de custo'

    #swagger.security = [{"apiKeyAuth": []}]

    #swagger.parameters['transactionType'] = {
      in: 'query',
      schema: {
        '@enum': ['INCOME', 'EXPENSE']
      }
    }

    #swagger.responses[200] = {
      schema: {
        "id": 1,
        "value": 10,
        "name": "Casa",
        "percentage": 50,
        "createdAt": "2024-01-24T18:57:20.748Z",
        "updatedAt": "2024-01-24T18:57:20.748Z",
        "deletedAt": "",
        "userId": 1,
        "transactions": [{}],
      }
    }
  */

  const user = request.userAuth;
  const filters = request.query.transactionType;
  const month = request.query.month;

  const data = await CostCenterRepository.getAll(user.id, filters, month);

  const dto = data?.map((item) => calculateTotalValue(item));

  return response.json(dto);
});
