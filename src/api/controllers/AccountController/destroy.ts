import { Response } from "express"
import { MapErrors } from "../../../configs/errors/MapErrors";
import { AccountRepository } from "../../repositories/AccountRepository";
import { UserAuthRequest } from "../../../configs/requests/UserAuthRequest";

export const destroy = MapErrors(async (request: UserAuthRequest, response: Response) => {
  // #swagger.tags = ['Conta']
  // #swagger.summary = 'Delete conta'

  const id = request.params.id;

  const data = await AccountRepository.delete(parseInt(id));

  return response.json(data);
});
