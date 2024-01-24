import { Response } from "express"
import { MapErrors } from "../../../configs/errors/MapErrors";
import { UserRepository } from "../../repositories/UserRepository";

export const getUsers = MapErrors(async (request: Request, response: Response) => {
  /*
    #swagger.tags = ['Usuário']
    #swagger.summary = 'Obter meu usuário'

    #swagger.security = [{"apiKeyAuth": []}]

    #swagger.responses[200] = {
      schema: [{
        "id": 1,
        "name": "Armando Pereira",
        "email": "a@gmail.com",
        "createdAt": "2024-01-24T18:57:20.748Z",
        "updatedAt": "2024-01-24T18:57:20.748Z"
      }]
    }
  */

  const data = await UserRepository.getAll();

  return response.json(data);
});
