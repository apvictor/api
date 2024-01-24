import { Response } from "express"
import { MapErrors } from "../../../configs/errors/MapErrors";
import { UserRepository } from "../../repositories/UserRepository";
import { UserAuthRequest } from "../../../configs/requests/UserAuthRequest";

export const me = MapErrors(async (request: UserAuthRequest, response: Response) => {
  // #swagger.tags = ['Usuário']
  // #swagger.summary = 'Obter meu usuário'

  const user = request.userAuth;

  const data = await UserRepository.getById(user.id);

  return response.json(data);
});
