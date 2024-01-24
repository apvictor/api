import { Response } from "express"
import { MapErrors } from "../../../configs/errors/MapErrors";
import { UserRepository } from "../../repositories/UserRepository";

export const getUsers = MapErrors(async (request: Request, response: Response) => {
  // #swagger.tags = ['Usuário']
  // #swagger.summary = 'Listar usuários'

  const data = await UserRepository.getAll();

  return response.json(data);
});
