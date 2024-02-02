import { Response } from "express"
import { MapErrors } from "../../../configs/errors/MapErrors";
import { CreateAccountModel } from "../../models/AccountModel";
import { AccountRepository } from "../../repositories/AccountRepository";
import { UserAuthRequest } from "../../../configs/requests/UserAuthRequest";

export const create = MapErrors(async (request: UserAuthRequest, response: Response) => {
  /*
    #swagger.tags = ['Conta']
    #swagger.summary = 'Criar conta'

    #swagger.security = [{"apiKeyAuth": []}]

    #swagger.parameters['body'] = {
      in: 'body',
      required: true,
      schema: {
        name: "Nubank",
      }
    }
  */

  const user = request.userAuth
  const accountData: CreateAccountModel = request.body;

  const data = await AccountRepository.insert({ ...accountData, userId: user.id });

  return response.status(201).json(data);
});
